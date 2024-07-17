import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AssistanceGroupEntity } from "../../entity/assistanceGroup/AssistanceGroupEntity";
import { AssistanceGroupRepository } from "./AssistanceGroupRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { ERRORCODE } from "../../utils";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { PracticumEntity } from "../../entity/practicum/PracticumEntity";

export class AssistanceGroupPrismaRepositoryImpl extends AssistanceGroupRepository {
  async getGroupByPracticumIdAndUsername(
    practicumId: string,
    username: string
  ): Promise<AssistanceGroupEntity[]> {
    const groups = await prismaDb.db?.assistantGroup.findMany({
      where: {
        AND: [
          { practicumId },
          {
            OR: [
              {
                assistant: { username },
              },
              {
                students: {
                  some: {
                    username,
                  },
                },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        assistant: {
          select: {
            id: true,
            username: true,
            fullname: true,
            nickname: true,
            classOf: true,
          },
        },
        students: true,
        number: true,
        practicum: {
          select: {
            course: true,
            badge: true,
            _count: {
              select: {
                classrooms: true,
                participants: true,
              },
            },
          },
        },
      },
    });

    return (
      groups?.map((g) => {
        return new AssistanceGroupEntity(g.number, {
          id: g.id,
          practicumId: practicumId,
          practicum: new PracticumEntity(g.practicum.course, {
            badge: g.practicum.badge ?? undefined,
            classroomsLength: g.practicum._count.classrooms,
          }),
          assistant: new ProfileEntity(
            g.assistant.username,
            g.assistant.fullname,
            g.assistant.nickname,
            g.assistant.classOf
          ),
          students: g.students.map((s) => {
            return new ProfileEntity(
              s.username,
              s.fullname,
              s.nickname,
              s.classOf
            );
          }),
        });
      }) ?? []
    );
  }

  async updateGroupById(
    groupId: string,
    edittedGroup: AssistanceGroupEntity
  ): Promise<void> {
    try {
      await prismaDb.db?.assistantGroup.update({
        where: {
          id: groupId,
        },
        data: {
          assistantId: edittedGroup.assistantId,
          number: edittedGroup.number,
          students: {
            connect: edittedGroup.studentIds?.map((sid) => ({ id: sid })),
          },
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

  async deleteGroupById(groupId: string): Promise<void> {
    try {
      await prismaDb.db?.assistantGroup.delete({
        where: {
          id: groupId,
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

  async getGroupById(groupId: string): Promise<AssistanceGroupEntity | null> {
    const group = await prismaDb.db?.assistantGroup.findUnique({
      where: {
        id: groupId,
      },
      include: {
        assistant: {
          select: {
            username: true,
            fullname: true,
            nickname: true,
            id: true,
            classOf: true,
            userId: true,
            profilePic: true,
          },
        },
        practicum: {
          select: { course: true, id: true },
        },
        students: {
          select: {
            username: true,
            fullname: true,
            nickname: true,
            id: true,
            classOf: true,
            userId: true,
            profilePic: true,
          },
        },
      },
    });

    if (!group) {
      return null;
    }

    return new AssistanceGroupEntity(group.number, {
      id: group.id,
      assistantId: group.assistantId,
      githubRepoLink: group.githubRepoLink ?? "",
      practicumId: group.practicumId,
      assistant: new ProfileEntity(
        group.assistant.username,
        group.assistant.fullname,
        group.assistant.nickname,
        group.assistant.classOf,
        {
          id: group.assistant.id,
          userId: group.assistant.userId,
          profilePic: group.assistant.profilePic ?? "",
        }
      ),
      practicum: new PracticumEntity(group.practicum.course, {
        id: group.practicum.id,
      }),
      students: group.students.map((s) => {
        return new ProfileEntity(
          s.username,
          s.fullname,
          s.nickname,
          s.classOf,
          {
            id: s.id,
            userId: s.userId,
            profilePic: s.profilePic ?? "",
          }
        );
      }),
    });
  }

  async getGroupByPracticumId(
    practicumId: string
  ): Promise<AssistanceGroupEntity[]> {
    const groups = await prismaDb.db?.assistantGroup.findMany({
      where: {
        practicumId,
      },
      select: {
        id: true,
        assistant: {
          select: {
            id: true,
            username: true,
            fullname: true,
            nickname: true,
            classOf: true,
          },
        },
        students: true,
        number: true,
        practicum: {
          select: {
            course: true,
            badge: true,
            _count: {
              select: {
                classrooms: true,
                participants: true,
              },
            },
          },
        },
      },
    });

    return (
      groups?.map((g) => {
        return new AssistanceGroupEntity(g.number, {
          id: g.id,
          practicumId: practicumId,
          practicum: new PracticumEntity(g.practicum.course, {
            badge: g.practicum.badge ?? undefined,
            classroomsLength: g.practicum._count.classrooms,
          }),
          assistant: new ProfileEntity(
            g.assistant.username,
            g.assistant.fullname,
            g.assistant.nickname,
            g.assistant.classOf
          ),
          students: g.students.map((s) => {
            return new ProfileEntity(
              s.username,
              s.fullname,
              s.nickname,
              s.classOf
            );
          }),
        });
      }) ?? []
    );
  }

  async addGroup(group: AssistanceGroupEntity): Promise<void | boolean> {
    try {
      await prismaDb.db?.assistantGroup.create({
        data: {
          number: group.number,
          assistantId: group.assistantId!,
          practicumId: group.practicumId!,
          students: {
            connect: group.studentIds?.map((sid) => ({ id: sid })),
          },
        },
      });

      return true;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }
}
