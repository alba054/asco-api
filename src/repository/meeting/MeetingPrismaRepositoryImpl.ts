import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { MeetingRepository } from "./MeetingRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../utils";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { PracticumEntity } from "../../entity/practicum/PracticumEntity";

export class MeetingPrismaRepositoryImpl extends MeetingRepository {
  async getMeetingsByClassroomId(
    classroomId: string
  ): Promise<MeetingEntity[]> {
    const meetings = await prismaDb.db?.meeting.findMany({
      where: {
        practicum: {
          classrooms: {
            some: {
              id: classroomId,
            },
          },
        },
      },
    });

    return (
      meetings?.map((m) => {
        return new MeetingEntity(
          m.number,
          m.lesson,
          Number(m.meetingDate),
          Number(m.assistanceDeadline),
          {
            assistantId: m.assistantId,
            coAssistantId: m.coAssistantId ?? "",
            id: m.id,
            module: m.module ?? "",
            practicumId: m.practicumId,
          }
        );
      }) ?? []
    );
  }

  async editMeetingById(
    id: string,
    meetingEntity: MeetingEntity
  ): Promise<void> {
    try {
      await prismaDb.db?.meeting.update({
        where: { id },
        data: {
          assistanceDeadline: meetingEntity.assistanceDeadline,
          lesson: meetingEntity.lesson,
          meetingDate: meetingEntity.meetingDate,
          number: meetingEntity.number,
          assignment: meetingEntity.assignment,
          assistantId: meetingEntity.assistantId ?? "",
          coAssistantId: meetingEntity.coAssistantId,
          practicumId: meetingEntity.practicumId ?? "",
          module: meetingEntity.module,
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

  async getMeetingsByPracticumId(
    practicumId: string
  ): Promise<MeetingEntity[]> {
    const meetings = await prismaDb.db?.meeting.findMany({
      where: {
        practicumId,
      },
    });

    return (
      meetings?.map((m) => {
        return new MeetingEntity(
          m.number,
          m.lesson,
          Number(m.meetingDate),
          Number(m.assistanceDeadline),
          {
            assistantId: m.assistantId,
            coAssistantId: m.coAssistantId ?? "",
            id: m.id,
            module: m.module ?? "",
            practicumId: m.practicumId,
          }
        );
      }) ?? []
    );
  }

  async deleteMeetingById(id: string): Promise<void> {
    try {
      await prismaDb.db?.meeting.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }

  async getMeetingById(id: string): Promise<MeetingEntity | null> {
    const meeting = await prismaDb.db?.meeting.findUnique({
      where: { id },
      include: {
        assistant: {
          select: {
            classOf: true,
            nickname: true,
            fullname: true,
            username: true,
          },
        },
        coAssistant: {
          select: {
            classOf: true,
            nickname: true,
            fullname: true,
            username: true,
          },
        },
        practicum: {
          select: {
            course: true,
            id: true,
            participants: {
              select: {
                username: true,
                fullname: true,
                nickname: true,
                classOf: true,
              },
            },
          },
        },
      },
    });

    if (!meeting) {
      return null;
    }

    return new MeetingEntity(
      meeting.number,
      meeting.lesson,
      Number(meeting.meetingDate),
      Number(meeting.assistanceDeadline),
      {
        id: meeting.id,
        assistantId: meeting.assistantId,
        coAssistantId: meeting.coAssistantId ?? "",
        module: meeting.module ?? "",
        assignment: meeting.assignment ?? "",
        practicumId: meeting.practicumId,
        assistant: new ProfileEntity(
          meeting.assistant.username,
          meeting.assistant.fullname,
          meeting.assistant.nickname,
          meeting.assistant.classOf
        ),
        coAssistant: new ProfileEntity(
          meeting.coAssistant?.username ?? "",
          meeting.coAssistant?.fullname ?? "",
          meeting.coAssistant?.nickname ?? "",
          meeting.coAssistant?.classOf ?? ""
        ),
        practicum: new PracticumEntity(meeting.practicum.course, {
          id: meeting.practicumId,
          participants: meeting.practicum.participants.map((p) => {
            return new ProfileEntity(
              p.username,
              p.fullname,
              p.nickname,
              p.classOf
            );
          }),
        }),
      }
    );
  }

  async addMeeting(meeting: MeetingEntity): Promise<void> {
    try {
      await prismaDb.db?.meeting.create({
        data: {
          assistanceDeadline: meeting.assistanceDeadline,
          lesson: meeting.lesson,
          meetingDate: meeting.meetingDate,
          number: meeting.number,
          assignment: meeting.assignment,
          assistantId: meeting.assistantId ?? "",
          coAssistantId: meeting.coAssistantId,
          practicumId: meeting.practicumId ?? "",
          module: meeting.module,
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
