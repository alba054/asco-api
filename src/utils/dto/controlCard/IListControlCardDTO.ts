import { ControlCardEntity } from "../../../entity/controlCard/ControlCardEntity";

interface IListControlCardDTO {
  id: string;
  meeting: {
    id: string;
    number: number;
    lesson: string;
    meetingDate: number;
  };
  firstAssistanceStatus: boolean;
  secondAssistanceStatus: boolean;
}

export const ListControlCardDTO = (card: ControlCardEntity) => {
  return {
    id: card.id,
    meeting: {
      id: card.meetingId,
      lesson: card.meeting?.lesson ?? null,
      number: card.meeting?.number ?? null,
      meetingDate: card.meeting?.meetingDate,
    },
    firstAssistanceStatus: card.firstAssistanceId ?? false,
    secondAssistanceStatus: card.secondAssistanceId ?? false,
  } as IListControlCardDTO;
};
