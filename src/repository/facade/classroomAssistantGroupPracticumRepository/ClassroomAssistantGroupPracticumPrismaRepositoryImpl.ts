import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ClassroomAssistantGroupPracticumRepository } from "./ClassroomAssistantGroupPracticumRepository";
import { ERRORCODE } from "../../../utils";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../../config/database/PrismaORMDBConfig";

export class ClassroomAssistantGroupPracticumPrismaRepositoryImpl extends ClassroomAssistantGroupPracticumRepository {
  async deleteClassrooomById(
    classroomId: string,
    practicumId: string,
    students: string[]
  ): Promise<void> {
    try {
      await prismaDb.db?.$transaction([
        prismaDb.db.classroom.delete({
          where: { id: classroomId },
        }),
        prismaDb.db.practicum.update({
          where: {
            id: practicumId,
          },
          data: {
            participants: {
              disconnect: students.map((s) => ({ username: s })),
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
