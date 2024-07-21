import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../../utils";
import { AssistanceGroupAssistanceRepository } from "./AssistanceGroupAssistanceRepository";
import { prismaDb } from "../../../config/database/PrismaORMDBConfig";

export class AssistanceGroupAssistancePrismaRepositoryImpl extends AssistanceGroupAssistanceRepository {
  async deleteGroupAndAssistanceByGroupId(groupId: string): Promise<void> {
    try {
      await prismaDb.db?.$transaction([
        prismaDb.db?.assistantGroup.delete({
          where: {
            id: groupId,
          },
        }),
        prismaDb.db.assistance.deleteMany({
          where: {
            OR: [
              {
                firstAssistanceControlCard: {
                  assistantGroupId: groupId,
                },
              },
              {
                secondAssistanceControlCard: {
                  assistantGroupId: groupId,
                },
              },
            ],
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
