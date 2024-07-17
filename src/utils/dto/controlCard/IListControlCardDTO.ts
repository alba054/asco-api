import { ControlCardEntity } from "../../../entity/controlCard/ControlCardEntity";

interface IListControlCardDTO {
  id: string;
  meeting: {
    id: string;
    number: number;
    lesson: string;
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
    },
    firstAssistanceStatus: card.firstAssistanceId ?? false,
    secondAssistanceStatus: card.secondAssistanceId ?? false,
  } as IListControlCardDTO;
};
