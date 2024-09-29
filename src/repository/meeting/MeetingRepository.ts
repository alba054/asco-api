import { SCORE_TYPE } from "@prisma/client";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { MeetingScoreEntity } from "../../entity/score/MeetingScoreEntity";

export abstract class MeetingRepository {
  abstract getMeetingScoresById(
    id: string,
    type: SCORE_TYPE,
    classroomId?: string
  ): Promise<MeetingScoreEntity[]>;

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
