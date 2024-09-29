import { constants } from "../..";
import { ControlCardEntity } from "../../../entity/controlCard/ControlCardEntity";

interface IMeetingControlCardDTO {
  meeting: {
    id: string;
    lesson: string;
    number: number;
  };
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
    classOf?: string;
  };
}

export const MeetingControlCardDTO = (card: ControlCardEntity) => {
  return {
    meeting: {
      id: card.meeting?.id,
      lesson: card.meeting?.lesson,
      number: card.meeting?.number,
    },
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
      classOF: card.student?.classOf,
      fullname: card.student?.fullname,
      id: card.student?.id,
      profilePic: constants.GCS_OBJECT_BASE(card.student?.profilePic) ?? null,
      username: card.student?.username,
    },
  } as IMeetingControlCardDTO;
};
