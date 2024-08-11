import { constants } from "../..";
import { ControlCardEntity } from "../../../entity/controlCard/ControlCardEntity";

interface IMeetingControlCardDTO {
  id: string;
  firstAssistance: {
    id: string;
    date: number;
    status: boolean;
  };
  secondAssistance: {
    id: string;
    date: number;
    status: boolean;
  };
  assistanceDeadline: number;
  student: {
    username: string;
    id: string;
    fullname: string;
    profilePic: string;
  };
}

export const MeetingControlCardDTO = (card: ControlCardEntity) => {
  return {
    assistanceDeadline: card.meeting?.assistanceDeadline,
    firstAssistance: {
      date: card.firstAssistance?.date,
      id: card.firstAssistance?.id,
      status: card.firstAssistance?.status,
    },
    secondAssistance: {
      date: card.secondAssistance?.date,
      id: card.secondAssistance?.id,
      status: card.secondAssistance?.status,
    },
    id: card.id,
    student: {
      fullname: card.student?.fullname,
      id: card.student?.id,
      profilePic: constants.GCS_OBJECT_BASE(card.student?.profilePic) ?? null,
      username: card.student?.username,
    },
  } as IMeetingControlCardDTO;
};
