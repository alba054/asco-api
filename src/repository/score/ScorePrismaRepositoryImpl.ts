import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ScoreEntity } from "../../entity/score/ScoreEntity";
import { ScoreRepository } from "./ScoreRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { ERRORCODE } from "../../utils";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { SCORE_TYPE, USER_ROLE } from "@prisma/client";
import { ScoreRecapEntity } from "../../entity/score/ScoreRecapEntity";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { ExamScoreEntity } from "../../entity/examScore/ExamScoreEntity";

export class ScorePrismaRepositoryImpl extends ScoreRepository {
  async getScoreById(id: string): Promise<ScoreEntity | null> {
    const score = await prismaDb.db?.score.findUnique({
      where: {
        id,
      },
    });

    if (!score) return null;

    return new ScoreEntity(score.type, score.score, { id: score.id });
  }

  async updateScoreById(scoreEntity: ExamScoreEntity): Promise<void> {
    try {
      await prismaDb.db?.score.update({
        where: {
          id: scoreEntity.id,
        },
        data: {
          score: scoreEntity.score,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }

  async getRecapScoreByPracticumIdAndStudentId(
    practicumId: string,
    profileId: any
  ): Promise<ScoreRecapEntity | null> {
    const recaps = await prismaDb.db?.profile.findFirst({
      where: {
        user: {
          role: USER_ROLE.STUDENT,
          username: profileId,
        },
      },
      include: {
        scores: {
          where: {
            classroom: {
              practicumId,
            },
          },
          include: {
            meeting: {
              select: {
                lesson: true,
                number: true,
              },
            },
          },
        },
        LabExamScore: {
          where: {
            practicumId,
          },
        },
      },
    });

    if (!recaps) return null;

    const meetings = await prismaDb.db?.meeting.count({
      where: { practicumId },
    });

    const assignmentScores = recaps?.scores
      .filter((s) => s.type == SCORE_TYPE.ASSIGNMENT)
      .map((s) => s.score);
    const quizScores = recaps?.scores
      .filter((s) => s.type == SCORE_TYPE.QUIZ)
      .map((s) => s.score);
    const responseScores = recaps?.scores
      .filter((s) => s.type == SCORE_TYPE.RESPONSE)
      .map((s) => s.score);

    let assignmentScore = 0;
    if (assignmentScores?.length) {
      assignmentScore = assignmentScores.reduce((a, b) => a + b);
    }
    let quizScore = 0;
    if (quizScores?.length) {
      quizScore = quizScores.reduce((a, b) => a + b);
    }
    let responseScore = 0;
    if (responseScores?.length) {
      responseScore = responseScores.reduce((a, b) => a + b);
    }

    return new ScoreRecapEntity(
      practicumId,
      assignmentScore / (meetings ?? 1),
      quizScore / (meetings ?? 1),
      responseScore / (meetings ?? 1),
      recaps.LabExamScore.at(0)?.score ?? 0,
      new ProfileEntity(
        recaps.username,
        recaps.fullname,
        recaps.nickname,
        recaps.classOf,
        {
          id: recaps.id,
          profilePic: recaps.profilePic ?? undefined,
        }
      ),
      {
        assignmentScores: recaps?.scores
          .filter((s) => s.type == SCORE_TYPE.ASSIGNMENT)
          .map((s) => ({
            assignmentScore: s.score,
            meetingName: s.meeting.lesson,
            meetingNumber: s.meeting.number,
          })),
        quizScores: recaps?.scores
          .filter((s) => s.type == SCORE_TYPE.QUIZ)
          .map((s) => ({
            quizScore: s.score,
            meetingName: s.meeting.lesson,
            meetingNumber: s.meeting.number,
          })),
        responseScores: recaps?.scores
          .filter((s) => s.type == SCORE_TYPE.RESPONSE)
          .map((s) => ({
            responseScore: s.score,
            meetingName: s.meeting.lesson,
            meetingNumber: s.meeting.number,
          })),
      }
    );
  }

  async getRecapScoreByPracticumId(
    practicumId: string
  ): Promise<ScoreRecapEntity[]> {
    const recaps = await prismaDb.db?.profile.findMany({
      where: {
        AND: [
          {
            user: {
              role: USER_ROLE.STUDENT,
            },
          },
          {
            practicums: {
              some: {
                id: practicumId,
              },
            },
          },
        ],
      },
      include: {
        scores: {
          where: {
            classroom: {
              practicumId,
            },
          },
        },
        LabExamScore: {
          where: {
            practicumId,
          },
        },
      },
    });

    const meetings = await prismaDb.db?.meeting.count({
      where: { practicumId },
    });

    const scoreRecaps = recaps?.map((r) => {
      const assignmentScores = r.scores
        .filter((s) => s.type == SCORE_TYPE.ASSIGNMENT)
        .map((s) => s.score);
      const quizScores = r.scores
        .filter((s) => s.type == SCORE_TYPE.QUIZ)
        .map((s) => s.score);
      const responseScores = r.scores
        .filter((s) => s.type == SCORE_TYPE.RESPONSE)
        .map((s) => s.score);

      let assignmentScore = 0;
      if (assignmentScores.length) {
        assignmentScore = assignmentScores.reduce((a, b) => a + b);
      }
      let quizScore = 0;
      if (quizScores.length) {
        quizScore = quizScores.reduce((a, b) => a + b);
      }
      let responseScore = 0;
      if (responseScores.length) {
        responseScore = responseScores.reduce((a, b) => a + b);
      }

      return new ScoreRecapEntity(
        practicumId,
        assignmentScore / (meetings ?? 1),
        quizScore / (meetings ?? 1),
        responseScore / (meetings ?? 1),
        r.LabExamScore.at(0)?.score ?? 0,
        new ProfileEntity(r.username, r.fullname, r.nickname, r.classOf, {
          id: r.id,
          profilePic: r.profilePic ?? undefined,
        })
      );
    });

    return scoreRecaps ?? [];
  }

  async getScoreByMeetingIdAndStudentIdAndType(
    meetingId: string,
    studentId: string,
    type: SCORE_TYPE
  ): Promise<ScoreEntity | null> {
    const score = await prismaDb.db?.score.findFirst({
      where: {
        meetingId,
        profileId: studentId,
        type,
      },
    });

    if (!score) return null;

    return new ScoreEntity(score.type, score.score, { id: score.id });
  }

  async insertNewScore(score: ScoreEntity): Promise<void> {
    try {
      await prismaDb.db?.score.create({
        data: {
          type: score.type!,
          classroomId: score.classroomId!,
          meetingId: score.meetingId!,
          score: score.score!,
          profileId: score.studentId!,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }
}
