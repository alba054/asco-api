import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ClassroomPracticumRepository } from "./ClassroomPracticumRepository";
import { ERRORCODE } from "../../../utils";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../../config/database/PrismaORMDBConfig";

export class ClassroomPracticumPrismaRepositoryImpl extends ClassroomPracticumRepository {
  async removeStudentFromPracticumAndClassroom(
    classroomId: string,
    practicumId: any,
    username: string
  ): Promise<void> {
    try {
      await prismaDb.db?.$transaction([
        prismaDb.db?.classroom.update({
          where: {
            id: classroomId,
          },
          data: {
            students: {
              disconnect: { username },
            },
          },
        }),
        prismaDb.db.practicum.update({
          where: {
            id: practicumId,
          },
          data: {
            participants: {
              disconnect: { username },
            },
          },
        }),
      ]);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }
}
