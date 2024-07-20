import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ClassRoomRepository } from "./ClassroomRepository";
import { ERRORCODE } from "../../utils";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { IPutClassroomStudents } from "../../utils/interfaces/request/IPutClassroomsStudents";
import { ClassroomEntity } from "../../entity/classroom/ClassroomEntity";
import { PracticumEntity } from "../../entity/practicum/PracticumEntity";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";

export class ClassroomPrismaRepositoryImpl extends ClassRoomRepository {
  async getClassroomByStudentUsername(
    username: string
  ): Promise<ClassroomEntity[]> {
    const classrooms = await prismaDb.db?.classroom.findMany({
      where: {
        students: {
          some: {
            username,
          },
        },
      },
      include: {
        _count: {
          select: {
            students: true,
          },
        },
        practicum: {
          select: {
            badge: true,
            course: true,
          },
        },
      },
    });

    return (
      classrooms?.map((c) => {
        return new ClassroomEntity(
          c.name,
          c.meetingDay,
          c.startTime,
          c.endTime,
          {
            id: c.id,
            practicum: new PracticumEntity(c.practicum.course, {
              id: c.practicumId,
              badge: c.practicum.badge ?? "",
            }),
            studentsCount: c._count.students,
          }
        );
      }) ?? []
    );
  }

  async removeStudentFromClassroom(
    classroomId: string,
    username: string
  ): Promise<void> {
    try {
      await prismaDb.db?.classroom.update({
        where: {
          id: classroomId,
        },
        data: {
          students: {
            disconnect: { username },
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

  async getClassroomById(classroomId: string): Promise<ClassroomEntity | null> {
    const classroom = await prismaDb.db?.classroom.findUnique({
      where: { id: classroomId },
      include: {
        practicum: true,
        students: true,
      },
    });

    if (!classroom) {
      return null;
    }

    return new ClassroomEntity(
      classroom.name,
      classroom.meetingDay,
      classroom.startTime,
      classroom.endTime,
      {
        id: classroom.id,
        practicum: new PracticumEntity(classroom.practicum.course),
        practicumId: classroom.practicumId,
        students: classroom.students.map((s) => {
          return new ProfileEntity(
            s.username,
            s.fullname,
            s.nickname,
            s.classOf
          );
        }),
      }
    );
  }

  async addStudents(
    classroomId: string,
    payload: IPutClassroomStudents
  ): Promise<void> {
    try {
      await prismaDb.db?.classroom.update({
        where: {
          id: classroomId,
        },
        data: {
          students: {
            connect: payload.students.map((s) => ({ username: s })),
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
}
