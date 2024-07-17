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
  } as IControlCardDTO;
};
