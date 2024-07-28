import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AttendanceEntity } from "../../entity/attendance/AttendanceEntity";
import { AttendanceRepository } from "./AttendanceRepository";
import { constants, ERRORCODE } from "../../utils";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";

export class AttendancePrismaRepositoryImpl extends AttendanceRepository {
  async insertAttendancesForAllStudentByMeetingId(
    attendances: AttendanceEntity[]
  ): Promise<void> {
    try {
      await prismaDb.db?.attendance.createMany({
        data: attendances.map((a) => ({
          meetingId: a.meetingId!,
          practicumId: a.practicumId!,
          profileId: a.studentId!,
          attendanceStatus: a.attendanceStatus,
          classroomId: a.classroomId,
          time: a.time,
        })),
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }

  async getAttendanceByMeetingIdOrClassroom(
    meetingId: string,
    classroom?: string | undefined
  ): Promise<AttendanceEntity[]> {
    const attendances = await prismaDb.db?.attendance.findMany({
      where: {
        AND: [
          { meetingId },
          {
            practicum: {
              classrooms: {
                some: {
                  id: classroom,
                },
              },
            },
          },
        ],
      },
      include: {
        meeting: {
          select: {
            assignment: true,
            assistant: true,
            coAssistant: true,
            id: true,
            lesson: true,
            number: true,
            meetingDate: true,
            assistanceDeadline: true,
            module: true,
          },
        },
        student: {
          select: {
            username: true,
            nickname: true,
            fullname: true,
            classOf: true,
            profilePic: true,
            id: true,
          },
        },
      },
    });

    return (
      attendances?.map((a) => {
        return new AttendanceEntity(a.attendanceStatus, {
          id: a.id,
          time: a.time ?? 0,
          student: new ProfileEntity(
            a.student.username,
            a.student.fullname,
            a.student.nickname,
            a.student.classOf,
            {
              id: a.student.id,
              profilePic:
                constants.GCS_OBJECT_BASE(a.student.profilePic ?? "") ??
                undefined,
            }
          ),
        });
      }) ?? []
    );
  }

  async deleteAttendanceById(id: string): Promise<void> {
    try {
      await prismaDb.db?.attendance.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }

  async getAttendanceById(id: string): Promise<AttendanceEntity | null> {
    const attendance = await prismaDb.db?.attendance.findUnique({
      where: { id },
    });

    if (!attendance) return null;

    return new AttendanceEntity(attendance.attendanceStatus, {
      id: attendance.id,
      extraPoint: attendance.extraPoint ?? 0,
      note: attendance.note ?? undefined,
      time: attendance.time ?? undefined,
    });
  }

  async insertAttendance(attendance: AttendanceEntity): Promise<void> {
    try {
      await prismaDb.db?.attendance.create({
        data: {
          attendanceStatus: attendance.attendanceStatus,
          extraPoint: attendance.extraPoint,
          meetingId: attendance.meetingId!,
          note: attendance.note,
          profileId: attendance.studentId!,
          practicumId: attendance.practicumId!,
          classroomId: attendance.classroomId,
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

  async getAttendancesByPracticumIdAndProfileId(
    practicumId: string,
    profileId: string
  ): Promise<AttendanceEntity[] | undefined> {
    try {
      const attendances = await prismaDb.db?.attendance.findMany({
        where: {
          profileId,
          practicumId,
        },
        include: {
          meeting: {
            select: {
              id: true,
              assistanceDeadline: true,
              lesson: true,
              number: true,
              meetingDate: true,
            },
          },
        },
      });

      return (
        attendances?.map((a) => {
          return new AttendanceEntity(a.attendanceStatus, {
            id: a.id,
            extraPoint: a.extraPoint ?? 0,
            meetingId: a.meetingId,
            meeting: new MeetingEntity(
              a.meeting.number,
              a.meeting.lesson,
              Number(a.meeting.meetingDate),
              Number(a.meeting.assistanceDeadline),
              {
                id: a.meeting.id,
              }
            ),
          });
        }) ?? []
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }
}
