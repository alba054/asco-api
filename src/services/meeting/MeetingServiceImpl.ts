import { USER_ROLE } from "@prisma/client";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPostClassroomMeetingPayload } from "../../utils/interfaces/request/IPostClassroomMeetingPayload";
import { IPutClassroomMeetingPayload } from "../../utils/interfaces/request/IPutClassroomMeetingPayload";
import { MeetingService } from "./MeetingService";

export class MeetingServiceImpl extends MeetingService {
  // * check to see meeting detail by its meeting id
  async isUserAuthorizedByMeetingId(
    meetingId: string,
    userRole: USER_ROLE,
    username: string
  ): Promise<boolean> {
    // * check to see
    // const meeting = await this.meetingRepository.getMeetingById(meetingId);

    // if (!meeting) {
    //   throw new NotFoundError(
    //     ERRORCODE.COMMON_NOT_FOUND,
    //     "meeting's not found"
    //   );
    // }

    // if ()

    return false;
  }

  // * check to see authorized user meetings list by its practicum
  async isUserAuthorizedByPracticumId(
    practicumId: string,
    userRole: USER_ROLE,
    username: string
  ): Promise<boolean> {
    if (userRole === USER_ROLE.ADMIN) {
      return true;
    }

    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    if (practicum.participants.find((p) => p.username === username)) {
      return true;
    }

    return false;
  }

  async editMeetingById(
    id: string,
    payload: IPutClassroomMeetingPayload
  ): Promise<void> {
    const meeting = await this.meetingRepository.getMeetingById(id);

    if (!meeting) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "meeting's not found"
      );
    }

    const meetingEntity = new MeetingEntity(
      payload.number ?? meeting.number,
      payload.lesson ?? meeting.lesson,
      payload.meetingDate ?? meeting.meetingDate,
      (payload.meetingDate ?? meeting.meetingDate) + 24 * 3600 * 7,
      {
        assistantId: payload.assistant ?? meeting.assistantId,
        coAssistantId: payload.coAssistant,
        assignment: payload.assignment ?? meeting.assignment,
        module: payload.module ?? meeting.module,
        practicumId: meeting.practicumId,
      }
    );

    await this.meetingRepository.editMeetingById(id, meetingEntity);
  }

  async getMeetingById(id: string): Promise<MeetingEntity> {
    const meeting = await this.meetingRepository.getMeetingById(id);

    if (!meeting) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "meeting's not found"
      );
    }

    return meeting;
  }

  async getMeetingsByPracticumId(
    practicumId: string
  ): Promise<MeetingEntity[]> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    return await this.meetingRepository.getMeetingsByPracticumId(practicumId);
  }

  async deleteMeetingById(id: string): Promise<void> {
    const meeting = await this.meetingRepository.getMeetingById(id);

    if (!meeting) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "meeting's not found"
      );
    }

    await this.meetingRepository.deleteMeetingById(id);
  }

  async addMeeting(
    practicumId: string,
    payload: IPostClassroomMeetingPayload
  ): Promise<void> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    const meeting = new MeetingEntity(
      payload.number,
      payload.lesson,
      payload.meetingDate,
      payload.meetingDate + 24 * 3600 * 7,
      {
        assistantId: payload.assistant,
        coAssistantId: payload.coAssistant,
        assignment: payload.assignment,
        module: payload.module,
        practicumId,
      }
    );

    await this.meetingRepository.addMeeting(meeting);
  }
}
