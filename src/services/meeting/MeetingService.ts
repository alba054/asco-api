import { USER_ROLE } from "@prisma/client";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { MeetingRepository } from "../../repository/meeting/MeetingRepository";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { IPostClassroomMeetingPayload } from "../../utils/interfaces/request/IPostClassroomMeetingPayload";
import { IPutClassroomMeetingPayload } from "../../utils/interfaces/request/IPutClassroomMeetingPayload";

export abstract class MeetingService {
  protected meetingRepository: MeetingRepository;
  protected practicumRepository: PracticumRepository;

  constructor(repository: {
    meetingRepository: MeetingRepository;
    practicumRepository: PracticumRepository;
  }) {
    this.meetingRepository = repository.meetingRepository;
    this.practicumRepository = repository.practicumRepository;
  }

  abstract isUserAuthorizedByMeetingId(
    meetingId: string,
    userRole: USER_ROLE,
    username: string
  ): Promise<boolean>;

  abstract isUserAuthorizedByPracticumId(
    practicumId: string,
    userRole: USER_ROLE,
    username: string
  ): Promise<boolean>;

  abstract editMeetingById(
    id: string,
    payload: IPutClassroomMeetingPayload,
    authorization?: { role?: USER_ROLE; assistantId?: string }
  ): Promise<void>;

  abstract getMeetingById(id: string): Promise<MeetingEntity>;

  abstract getMeetingsByPracticumId(
    practicumId: string
  ): Promise<MeetingEntity[]>;

  abstract deleteMeetingById(id: string): Promise<void>;

  abstract addMeeting(
    practicumId: string,
    payload: IPostClassroomMeetingPayload
  ): Promise<void>;
}
