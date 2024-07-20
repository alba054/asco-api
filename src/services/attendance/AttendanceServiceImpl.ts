import { AttendanceEntity } from "../../entity/attendance/AttendanceEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import {
  convertDateToTimeInMinutes,
  convertEpochToDate,
  ERRORCODE,
} from "../../utils";
import { IPostMeetingAttendancePayload } from "../../utils/interfaces/request/IPostMeetingAttendancePayload";
import { AttendanceService } from "./AttendanceService";

export class AttendanceServiceImpl extends AttendanceService {
  async deleteAttendanceById(id: string, assistantId?: string): Promise<void> {
    const attendance = await this.attendanceRepository.getAttendanceById(id);

    if (!attendance) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "attendance's not found"
      );
    }

    this.attendanceRepository.deleteAttendanceById(id);
  }

  async addAttendance(
    meetingId: string,
    payload: IPostMeetingAttendancePayload,
    assistantId: string
  ): Promise<void> {
    const meeting = await this.meetingRepository.getMeetingById(meetingId);

    if (!meeting) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "meeting's not found"
      );
    }

    if (
      !meeting.practicum?.participants.map((p) => p.id).includes(assistantId)
    ) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "assistant's not in practicum participants"
      );
    }

    if (
      !meeting.practicum?.participants
        .map((p) => p.id)
        .includes(payload.profileId)
    ) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "student's not in practicum participants"
      );
    }

    const attendance = new AttendanceEntity(payload.attendanceStatus, {
      extraPoint: payload.extraPoint,
      note: payload.note,
      studentId: payload.profileId,
      time: convertDateToTimeInMinutes(
        Math.floor(convertEpochToDate(new Date().getTime(), 8).getTime() / 1000)
      ),
      practicumId: meeting.practicum.id,
      meetingId,
    });

    this.attendanceRepository.insertAttendance(attendance);
  }

  async getAttendancesByPracticumIdAndProfileId(
    practicumId: string,
    profileId: string
  ): Promise<AttendanceEntity[]> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    return (
      (await this.attendanceRepository.getAttendancesByPracticumIdAndProfileId(
        practicumId,
        profileId
      )) ?? []
    );
  }
}
