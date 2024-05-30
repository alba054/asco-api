import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IPostPracticumClassroomsAndAssistants } from "../../../utils/interfaces/request/IPostPracticumClassroomsAndAssistants";
import { PracticumClassroomsAndAssistantsRepository } from "./PracticumClassroomsAndAssistantsRepository";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { ERRORCODE } from "../../../utils";
import { InternalServerError } from "../../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../../config/database/PrismaORMDBConfig";

export class PracticumClassroomsAndAssistantsPrismaRepository extends PracticumClassroomsAndAssistantsRepository {
  async addClassroomsAndAsistantsPracticum(
    practicumId: string,
    payload: IPostPracticumClassroomsAndAssistants
  ): Promise<void> {
    try {
      await prismaDb.db?.$transaction([
        prismaDb.db.classroom.createMany({
          data: payload.classrooms.map((c) => {
            return {
              endTime: c.endTime,
              meetingDay: c.meetingDay,
              name: c.name,
              startTime: c.startTime,
              practicumId,
            };
          }),
        }),
        prismaDb.db.practicum.update({
          where: {
            id: practicumId,
          },
          data: {
            participants: {
              connect: payload.assistants.map((a) => {
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
