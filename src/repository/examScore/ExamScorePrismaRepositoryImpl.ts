import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ExamScoreEntity } from "../../entity/examScore/ExamScoreEntity";
import { ExamScoreRepository } from "./ExamScoreRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../utils";

export class ExamScorePrismaRepositoryImpl extends ExamScoreRepository {
  async getExamScoreById(id: string): Promise<ExamScoreEntity | null> {
    const score = await prismaDb.db?.labExamScore.findUnique({
      where: {
        id,
      },
    });

    if (!score) return null;

    return new ExamScoreEntity(score.score, { id: score.id });
  }

  async updateExamScoreById(scoreEntity: ExamScoreEntity): Promise<void> {
    try {
      await prismaDb.db?.labExamScore.update({
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

  async insertNewScore(score: ExamScoreEntity): Promise<void> {
    try {
      await prismaDb.db?.labExamScore.create({
        data: {
          score: score.score!,
          profileId: score.studentId!,
          practicumId: score.practicumId!,
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

  async getScoreByMeetingIdAndStudentIdAndType(
    id: string,
    studentId: string
  ): Promise<ExamScoreEntity | null> {
    const score = await prismaDb.db?.labExamScore.findFirst({
      where: {
        id,
        profileId: studentId,
      },
    });

    if (!score) return null;

    return new ExamScoreEntity(score.score);
  }
}
