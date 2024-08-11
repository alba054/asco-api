import { MeetingEntity } from "../../../entity/meeting/MeetingEntity";

interface IListAssistantMeetingDTO {
  id: string;
  number: number;
  lesson: string;
  meetingDate: number;
  assistant: boolean;
}

export const ListAssistantMeetingDTO = (
  meeting: MeetingEntity[],
  profileId: string
) => {
  return meeting.map((m) => {
    return {
      id: m.id,
      lesson: m.lesson,
      meetingDate: m.meetingDate,
      number: m.number,
      assistant: m.assistantId === profileId,
    } as IListAssistantMeetingDTO;
  });
};
