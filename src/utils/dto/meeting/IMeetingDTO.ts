import { MeetingEntity } from "../../../entity/meeting/MeetingEntity";

interface IMeetingDTO {
  id: string;
  number: number;
  lesson: string;
  meetingDate: number;
  assistant: { nickname: string; fullname: string; classOf: string };
  coAssistant: { nickname: string; fullname: string; classOf: string };
  practicum: {
    id: string;
    name: string;
  };
}

export const MeetingDTO = (meeting: MeetingEntity) => {
  return {
    assistant: {
      classOf: meeting.assistant?.classOf,
      fullname: meeting.assistant?.fullname,
      nickname: meeting.assistant?.nickname,
    },
    coAssistant: {
      classOf: meeting.coAssistant?.classOf,
      fullname: meeting.coAssistant?.fullname,
      nickname: meeting.coAssistant?.nickname,
    },
    id: meeting.id,
    lesson: meeting.lesson,
    meetingDate: meeting.meetingDate,
    number: meeting.number,
    practicum: {
      name: meeting.practicum?.course,
      id: meeting.practicumId,
    },
  } as IMeetingDTO;
};
