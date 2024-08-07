import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ScoreEntity } from "../../entity/score/ScoreEntity";
import { ScoreRepository } from "./ScoreRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { ERRORCODE } from "../../utils";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { SCORE_TYPE } from "@prisma/client";

export class ScorePrismaRepositoryImpl extends ScoreRepository {
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
