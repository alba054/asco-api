import { ERRORCODE } from "../../../utils";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { IPutClassroomStudents } from "../../../utils/interfaces/request/IPutClassroomsStudents";
import { ClassroomPracticumStudentsRepository } from "./ClassroomPracticumStudentsRepository";
import { prismaDb } from "../../../config/database/PrismaORMDBConfig";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { InternalServerError } from "../../../Exceptions/http/InternalServerError";

export class ClassroomPracticumStudentsPrismaRepositoryImpl extends ClassroomPracticumStudentsRepository {
  async addStudentsToClassroomAndPracticum(
    classroomId: string,
    practicumId: string,
    payload: IPutClassroomStudents
  ): Promise<void> {
    try {
      await prismaDb.db?.$transaction([
        prismaDb.db?.classroom.update({
          where: {
            id: classroomId,
          },
          data: {
            students: {
              connect: payload.students.map((s) => ({ username: s })),
            },
          },
        }),
        prismaDb.db?.practicum.update({
          where: {
            id: practicumId,
          },
          data: {
            participants: {
              connect: payload.students.map((a) => {
                return { username: a };
              }),
            },
          },
        }),
      ]);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("internal server error");
      }
    }
  }
}
