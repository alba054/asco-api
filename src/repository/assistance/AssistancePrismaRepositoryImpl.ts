import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { AssistanceEntity } from "../../entity/assistance/AssistanceEntity";
import { AssistanceGroupEntity } from "../../entity/assistanceGroup/AssistanceGroupEntity";
import { ControlCardEntity } from "../../entity/controlCard/ControlCardEntity";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { AssistanceRepository } from "./AssistanceRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../utils";

export class AssistancePrismaRepositoryImpl extends AssistanceRepository {
  async updateAssistanceById(
    updatedAssistance: AssistanceEntity
  ): Promise<void> {
    try {
      await prismaDb.db?.assistance.update({
        where: {
          id: updatedAssistance.id,
        },
        data: {
          note: updatedAssistance.note,
          date: updatedAssistance.date,
          status: updatedAssistance.status,
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

  async getAssistanceById(id: string): Promise<AssistanceEntity | null> {
    const assistance = await prismaDb.db?.assistance.findUnique({
      where: {
        id,
      },
      include: {
        firstAssistanceControlCard: {
          select: {
            group: {
              select: {
                assistantId: true,
              },
            },
            student: {
              select: {
                id: true,
                username: true,
                fullname: true,
              },
            },
          },
        },
        secondAssistanceControlCard: {
          select: {
            group: {
              select: {
                assistantId: true,
              },
            },
            student: {
              select: {
                id: true,
                username: true,
                fullname: true,
              },
            },
          },
        },
      },
    });

    if (!assistance) return null;

    return new AssistanceEntity(assistance.status, {
      date: Number(assistance.date),
      id: assistance.id,
      note: assistance.note ?? undefined,
      CC: new ControlCardEntity("", "", "", {
        group: new AssistanceGroupEntity(0, {
          assistantId:
            assistance.firstAssistanceControlCard?.group?.assistantId ??
            assistance.secondAssistanceControlCard?.group?.assistantId ??
            "",
        }),
        student: new ProfileEntity(
          assistance.firstAssistanceControlCard?.student.username ??
            assistance.secondAssistanceControlCard?.student.username ??
            "",
          assistance.firstAssistanceControlCard?.student.fullname ??
            assistance.secondAssistanceControlCard?.student.fullname ??
            "",
          "",
          "",
          {
            id:
              assistance.firstAssistanceControlCard?.student.id ??
              assistance.secondAssistanceControlCard?.student.id ??
              "",
          }
        ),
      }),
    });
  }
}
