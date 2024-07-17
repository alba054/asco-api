import { constants } from "../..";
import { MeetingEntity } from "../../../entity/meeting/MeetingEntity";

interface IMeetingDTO {
  id: string;
  number: number;
  lesson: string;
  meetingDate: number;
  assistant: {
    nickname: string;
    fullname: string;
    classOf: string;
    profilePic: string;
    username: string;
    id: string;
  };
  coAssistant: {
    id: string;
    nickname: string;
    fullname: string;
    classOf: string;
    profilePic: string;
    username: string;
  };
  practicum: {
    id: string;
    name: string;
  };
  module: string;
  assignment: string;
  assistanceDeadline: number;
}

export const MeetingDTO = (meeting: MeetingEntity) => {
  return {
    assistant: {
      id: meeting.assistantId,
      classOf: meeting.assistant?.classOf,
      fullname: meeting.assistant?.fullname,
      nickname: meeting.assistant?.nickname,
      profilePic: !meeting.assistant?.profilePic
        ? null
        : meeting.assistant?.profilePic,
      username: meeting.assistant?.username,
    },
    coAssistant: {
      id: meeting.coAssistantId,
      classOf: meeting.coAssistant?.classOf,
      fullname: meeting.coAssistant?.fullname,
      nickname: meeting.coAssistant?.nickname,
      profilePic: !meeting.coAssistant?.profilePic
        ? null
        : meeting.coAssistant?.profilePic,
      username: meeting.coAssistant?.username,
    },
    id: meeting.id,
    lesson: meeting.lesson,
    meetingDate: meeting.meetingDate,
    number: meeting.number,
    practicum: {
      name: meeting.practicum?.course,
      id: meeting.practicumId,
    },
    assignment: constants.GCS_OBJECT_BASE(meeting.assignment),
    module: constants.GCS_OBJECT_BASE(meeting.module),
    assistanceDeadline: meeting.assistanceDeadline,
  } as IMeetingDTO;
};
