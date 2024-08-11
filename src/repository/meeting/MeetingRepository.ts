import { MeetingEntity } from "../../entity/meeting/MeetingEntity";

export abstract class MeetingRepository {
  abstract getMeetingsByAssistantIdOrCoAssistantIdAndPracticum(
    assistantId: string,
    practicum?: string
  ): Promise<MeetingEntity[]>;
  abstract getMeetingAttendancesByPracticumId(
    practicumId: string,
    classroom: any
  ): Promise<MeetingEntity[]>;

  abstract getMeetingsByClassroomId(
    classroomId: string
  ): Promise<MeetingEntity[]>;

  abstract editMeetingById(
    id: string,
    meetingEntity: MeetingEntity
  ): Promise<void>;

  abstract getMeetingsByPracticumId(
    practicumId: string
  ): Promise<MeetingEntity[]>;

  abstract deleteMeetingById(id: string): Promise<void>;

  abstract getMeetingById(id: string): Promise<MeetingEntity | null>;

  abstract addMeeting(meeting: MeetingEntity): Promise<void>;
}
