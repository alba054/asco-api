import { MeetingEntity } from "../../../entity/meeting/MeetingEntity";

interface IListMeetingDTO {
  id: string;
  number: number;
  lesson: string;
  meetingDate: number;
}

export const ListMeetingDTO = (meeting: MeetingEntity) => {
  return {
    id: meeting.id,
    lesson: meeting.lesson,
    meetingDate: meeting.meetingDate,
    number: meeting.number,
  } as IListMeetingDTO;
};
