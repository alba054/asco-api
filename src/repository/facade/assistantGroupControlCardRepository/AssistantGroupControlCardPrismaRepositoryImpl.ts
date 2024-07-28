import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AssistantGroupControlCardRepository } from "./AassistantGroupControlCardRepository";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../../utils";
import { prismaDb } from "../../../config/database/PrismaORMDBConfig";

export class AssistantGroupControlCardPrismaRepositoryImpl extends AssistantGroupControlCardRepository {
  async removeStudentFromGroupAndControlCard(
    groupId: string,
    username: string
  ): Promise<void> {
    try {
      await prismaDb.db?.$transaction([
        prismaDb.db.assistantGroup.update({
          where: {
            id: groupId,
          },
          data: {
            students: {
              disconnect: {
                username,
              },
            },
          },
        }),
        prismaDb.db.controlCard.deleteMany({
          where: {
            student: {
              username,
            },
            assistantGroupId: groupId,
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
