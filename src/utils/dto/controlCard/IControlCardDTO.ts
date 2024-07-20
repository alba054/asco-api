import { constants } from "../..";
import { ControlCardEntity } from "../../../entity/controlCard/ControlCardEntity";

interface IControlCardDTO {
  meeting: {
    id: string;
    lesson: string;
    number: number;
    assignment: string;
    meetingDate: number;
    assistanceDeadline: number;
  };
  id: string;
  firstAssistance: {
    id: string;
    date: number;
    status: boolean;
    note: string;
  };
  secondAssistance: {
    id: string;
    date: number;
    status: boolean;
    note: string;
  };
}

export const ControlCardDTO = (card: ControlCardEntity) => {
  return {
    id: card.id,
    meeting: {
      id: card.meetingId,
      lesson: card.meeting?.lesson ?? null,
      number: card.meeting?.number ?? null,
      assignment: constants.GCS_OBJECT_BASE(card.meeting?.assignment),
      assistanceDeadline: card.meeting?.assistanceDeadline,
      meetingDate: card.meeting?.meetingDate,
    },
    firstAssistance: {
      date: card.firstAssistance?.date,
      id: card.firstAssistanceId,
      note: card.firstAssistance?.note,
      status: card.firstAssistance?.status,
    },
    secondAssistance: {
      date: card.secondAssistance?.date,
      id: card.secondAssistanceId,
      note: card.secondAssistance?.note,
      status: card.secondAssistance?.status,
    },
  } as IControlCardDTO;
};
