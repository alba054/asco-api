import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { AssistanceEntity } from "../../entity/assistance/AssistanceEntity";
import { ControlCardEntity } from "../../entity/controlCard/ControlCardEntity";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { ControlCardRepository } from "./ControlCardRepository";

export class ControlCardPrismaRepositoryImpl extends ControlCardRepository {
  async getControlCardByMeetingIdAndAssistantId(
    meetingId: string,
    assitantId: string
  ): Promise<ControlCardEntity[]> {
    const cards = await prismaDb.db?.controlCard.findMany({
      where: {
        meetingId,
        group: {
          assistantId: assitantId,
        },
      },
      include: {
        firstAssistance: true,
        secondAssistance: true,
        meeting: true,
        student: true,
      },
    });

    return (
      cards?.map((c) => {
        return new ControlCardEntity("", c.profileId, c.meetingId, {
          id: c.id,
          firstAssistance: new AssistanceEntity(c.firstAssistance?.status!, {
            id: c.firstAssistance?.id,
            date: Number(c.firstAssistance?.date),
          }),
          secondAssistance: new AssistanceEntity(c.secondAssistance?.status!, {
            id: c.secondAssistance?.id,
            date: Number(c.secondAssistance?.date),
          }),
          meeting: new MeetingEntity(
            c.meeting.number,
            c.meeting.lesson,
            Number(c.meeting.meetingDate),
            Number(c.meeting.assistanceDeadline),
            {
              id: c.meeting.id,
            }
          ),
          student: new ProfileEntity(
            c.student.username,
            c.student.fullname,
            c.student.nickname,
            c.student.classOf,
            {
              id: c.student.id,
              profilePic: c.student.profilePic ?? "",
            }
          ),
        });
      }) ?? []
    );
  }

  async getControlCardById(cardId: string): Promise<ControlCardEntity | null> {
    const card = await prismaDb.db?.controlCard.findUnique({
      where: {
        id: cardId,
      },
      include: {
        meeting: {
          select: {
            id: true,
            lesson: true,
            number: true,
            assistanceDeadline: true,
            meetingDate: true,
            assignment: true,
          },
        },
        firstAssistance: true,
        secondAssistance: true,
      },
    });

    if (!card) {
      return null;
    }

    return new ControlCardEntity(
      card.practicumId ?? "",
      card.profileId,
      card.meetingId,
      {
        id: card.id,
        meeting: new MeetingEntity(
          card.meeting.number,
          card.meeting.lesson,
          Number(card.meeting.meetingDate),
          Number(card.meeting.assistanceDeadline),
          {
            assignment: card.meeting.assignment ?? undefined,
            id: card.meetingId,
          }
        ),
        firstAssistanceId: card.firstAssistanceId ?? undefined,
        secondAssistanceId: card.secondAssistanceId! ?? undefined,
        firstAssistance: new AssistanceEntity(
          card.firstAssistance?.status ?? false,
          {
            id: card.firstAssistance?.id,
            date: Number(card.firstAssistance?.date),
            note: card.firstAssistance?.note ?? "",
          }
        ),
        secondAssistance: new AssistanceEntity(
          card.secondAssistance?.status ?? false,
          {
            id: card.secondAssistance?.id,
            date: Number(card.secondAssistance?.date),
            note: card.secondAssistance?.note ?? "",
          }
        ),
      }
    );
  }

  async getControlCardsByPracticumIdAndProfileId(
    practicumId: string,
    profileId: string
  ): Promise<ControlCardEntity[]> {
    const cards = await prismaDb.db?.controlCard.findMany({
      where: {
        practicumId,
        profileId,
      },
      include: {
        meeting: {
          select: {
            id: true,
            lesson: true,
            number: true,
            meetingDate: true,
          },
        },
        student: {
          select: {
            id: true,
            classOf: true,
            fullname: true,
            githubUsername: true,
            instagramUsername: true,
            nickname: true,
            profilePic: true,
            username: true,
          },
        },
      },
    });

    return (
      cards?.map((c) => {
        return new ControlCardEntity(
          c.practicumId ?? "",
          c.profileId,
          c.meetingId,
          {
            id: c.id,
            meeting: new MeetingEntity(
              c.meeting.number,
              c.meeting.lesson,
              Number(c.meeting.meetingDate),
              0
            ),
            student: new ProfileEntity(
              c.student.username!,
              c.student.fullname!,
              c.student.nickname!,
              c.student.classOf!,
              {
                id: c.student.id,
                profilePic: c.student.profilePic ?? undefined,
                instagramUsername: c.student.instagramUsername ?? undefined,
                githubUsername: c.student.githubUsername ?? undefined,
              }
            ),
          }
        );
      }) ?? []
    );
  }
}
