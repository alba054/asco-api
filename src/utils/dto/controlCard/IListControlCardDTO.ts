import { constants } from "../..";
import { ControlCardEntity } from "../../../entity/controlCard/ControlCardEntity";

interface IListControlCardDTO {
  student: {
    id: string;
    username: string;
    profilePic: string;
    nickname: string;
    fullname: string;
    classOf: string;
    githubUsername: string;
    instagramUsername: string;
  };
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
    student: {
      classOf: card.student?.classOf,
      fullname: card.student?.fullname,
      githubUsername: card.student?.githubUsername ?? null,
      id: card.studentId,
      instagramUsername: card.student?.instagramUsername ?? null,
      nickname: card.student?.nickname,
      profilePic: constants.GCS_OBJECT_BASE(card.student?.profilePic) ?? null,
      username: card.student?.username,
    },
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
