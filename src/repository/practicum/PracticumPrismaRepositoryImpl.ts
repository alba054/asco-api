import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../utils";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { PracticumRepository } from "./PracticumRepository";
import { PracticumEntity } from "../../entity/practicum/PracticumEntity";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { UserEntity } from "../../entity/user/UserEntity";
import { ClassroomEntity } from "../../entity/classroom/ClassroomEntity";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";

export class PracticumPrismaRepositoryImpl extends PracticumRepository {
  async getPracticumsByParticipantId(
    profileId: string
  ): Promise<PracticumEntity[]> {
    const practicums = await prismaDb.db?.practicum.findMany({
      where: {
        participants: {
          some: {
            id: profileId,
          },
        },
      },
      select: {
        id: true,
        course: true,
        badge: true,
        _count: {
          select: {
            classrooms: true,
            meetings: true,
          },
        },
        classrooms: {
          include: {
            _count: { select: { students: true } },
          },
        },
      },
    });

    return (
      practicums?.map((p) => {
        return new PracticumEntity(p.course, {
          badge: p.badge ?? "",
          id: p.id,
          classroomsLength: p._count.classrooms,
          meetingsLength: p._count.meetings,
          classrooms: p.classrooms.map((c) => {
            return new ClassroomEntity(
              c.name,
              c.meetingDay,
              c.startTime,
              c.endTime,
              {
                id: c.id,
                practicumId: c.practicumId,
                studentsCount: c._count.students,
              }
            );
          }),
        });
      }) ?? []
    );
  }

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
          examInfo: practicumEntity.examInfo,
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
        meetings: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!practicum) {
      return null;
    }

    return new PracticumEntity(practicum?.course ?? "", {
      classrooms: practicum?.classrooms.map((c) => {
        return new ClassroomEntity(
          c.name,
          c.meetingDay,
          c.startTime,
          c.endTime,
          {
            id: c.id,
            practicumId: c.practicumId,
          }
        );
      }),
      meetings: practicum.meetings.map((m) => {
        return new MeetingEntity(
          m.number,
          m.lesson,
          Number(m.meetingDate),
          Number(m.assistanceDeadline),
          { id: m.id }
        );
      }),
      examInfo: practicum.examInfo ?? undefined,
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
            meetings: true,
          },
        },
        classrooms: {
          include: {
            _count: { select: { students: true } },
          },
        },
      },
    });

    return (
      practicums?.map((p) => {
        return new PracticumEntity(p.course, {
          badge: p.badge ?? "",
          id: p.id,
          classroomsLength: p._count.classrooms,
          meetingsLength: p._count.meetings,
          classrooms: p.classrooms.map((c) => {
            return new ClassroomEntity(
              c.name,
              c.meetingDay,
              c.startTime,
              c.endTime,
              {
                id: c.id,
                practicumId: c.practicumId,
                studentsCount: c._count.students,
              }
            );
          }),
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
          examInfo: practicum.examInfo,
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
