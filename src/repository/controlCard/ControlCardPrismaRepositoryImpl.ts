import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ControlCardEntity } from "../../entity/controlCard/ControlCardEntity";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { ControlCardRepository } from "./ControlCardRepository";

export class ControlCardPrismaRepositoryImpl extends ControlCardRepository {
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
              0,
              0
            ),
          }
        );
      }) ?? []
    );
  }
}
