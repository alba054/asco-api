import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../utils";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { PracticumRepository } from "./PracticumRepository";
import { PracticumEntity } from "../../entity/practicum/PracticumEntity";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { UserEntity } from "../../entity/user/UserEntity";

export class PracticumPrismaRepositoryImpl extends PracticumRepository {
  async deletePracticumById(practicumId: string): Promise<void> {
    try {
      await prismaDb.db?.practicum.delete({ where: { id: practicumId } });
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

  async updatePracticumById(practicumEntity: PracticumEntity): Promise<string> {
    try {
      const practicum = await prismaDb.db?.practicum.update({
        where: {
          id: practicumEntity.id,
        },
        data: {
          course:
            practicumEntity.course === "" ? undefined : practicumEntity.course,
          badge: practicumEntity.badge,
          courseContract: practicumEntity.courseContract,
        },
      });

      return practicum?.id ?? "";
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

  async getPracticumById(practicumId: string): Promise<PracticumEntity | null> {
    const practicum = await prismaDb.db?.practicum.findUnique({
      where: { id: practicumId },
      include: {
        classrooms: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    return new PracticumEntity(practicum?.course ?? "", {
      badge: practicum?.badge ?? "",
      classroomsLength: practicum?.classrooms.length,
      courseContract: practicum?.courseContract ?? "",
      id: practicum?.id,
      participants: practicum?.participants.map((p) => {
        return new ProfileEntity(
          p.username,
          p.fullname,
          p.nickname,
          p.classOf,
          {
            id: p.id,
            userId: p.userId,
            githubUsername: p.githubUsername ?? "",
            instagramUsername: p.instagramUsername ?? "",
            profilePic: p.profilePic ?? "",
            user: new UserEntity(p.username, "", p.user.role),
          }
        );
      }),
    });
  }

  async getPracticums(): Promise<PracticumEntity[]> {
    const practicums = await prismaDb.db?.practicum.findMany({
      select: {
        id: true,
        course: true,
        badge: true,
        _count: {
          select: {
            classrooms: true,
          },
        },
      },
    });

    return (
      practicums?.map((p) => {
        return new PracticumEntity(p.course, {
          badge: p.badge ?? "",
          id: p.id,
        });
      }) ?? []
    );
  }

  async createPracticum(practicum: PracticumEntity): Promise<string> {
    try {
      const newPracticum = await prismaDb.db?.practicum.create({
        data: {
          course: practicum.course,
          badge: practicum.badge,
          courseContract: practicum.courseContract,
        },
      });

      return newPracticum?.id ?? "";
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
