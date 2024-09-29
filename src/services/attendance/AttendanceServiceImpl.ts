import { ATTENDANCE_STATUS, USER_ROLE } from "@prisma/client";
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
import { IPutAttendancePayload } from "../../utils/interfaces/request/IPutAttendancePayload";
import { IPutMeetingAttendancePayload } from "../../utils/interfaces/request/IPutMeetingAttendancePayload";

export class AttendanceServiceImpl extends AttendanceService {
  async updateAttendaceByMeetingIdAndProfileId(
    id: string,
    payload: IPutMeetingAttendancePayload,
    profileId: string
  ): Promise<void> {
    const meeting = await this.meetingRepository.getMeetingById(id);

    if (!meeting) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "meeting's not found"
      );
    }

    const oldAttendance =
      await this.attendanceRepository.getAttendanceByMeetingIdAndStudentId(
        id,
        payload.profileId // studentId
      );

    if (!oldAttendance) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "attendance doesn't exist"
      );
    }

    console.log(payload);
    console.log(oldAttendance);

    const attendance = new AttendanceEntity(payload.attendanceStatus, {
      extraPoint: payload.extraPoint,
      note: payload.note,
      studentId: payload.profileId,
      time: convertDateToTimeInMinutes(
        Math.floor(convertEpochToDate(new Date().getTime(), 8).getTime() / 1000)
      ),
      id: oldAttendance.id,
    });

    this.attendanceRepository.updateAttendanceById(attendance);
  }

  async getAttendanceById(id: string): Promise<AttendanceEntity> {
    const attendance = await this.attendanceRepository.getAttendanceById(id);

    if (!attendance) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "attendance's not found"
      );
    }

    // todo:
    // create a logic for eligible student and assistant here
    // todo:

    return attendance;
  }

  async updateAttendanceById(
    id: string,
    payload: IPutAttendancePayload,
    profileId: string
  ): Promise<void> {
    const oldAttendance = await this.attendanceRepository.getAttendanceById(id);

    if (!oldAttendance) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "attendance's not found"
      );
    }

    /*
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
    */

    /*
    const classroom =
      await this.classroomRepository.getClassroomByStudentIdAndPracticumId(
        payload.profileId,
        meeting.practicum.id!
      );

    if (!classroom) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "student's classroom is not found"
      );
    }
    */

    const attendance = new AttendanceEntity(
      payload.attendanceStatus ?? oldAttendance.attendanceStatus,
      {
        id,
        extraPoint: payload.extraPoint ?? oldAttendance.extraPoint,
        note: payload.note ?? oldAttendance.note,
        time: convertDateToTimeInMinutes(
          Math.floor(
            convertEpochToDate(new Date().getTime(), 8).getTime() / 1000
          )
        ),
      }
    );

    this.attendanceRepository.updateAttendanceById(attendance);
  }

  async addAttendancesForAllStudentsByMeetingId(id: string): Promise<void> {
    const meeting = await this.meetingRepository.getMeetingById(id);

    if (!meeting) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "meeting's not found"
      );
    }

    const attendances =
      meeting.practicum?.participants
        .filter((p) => p.user?.role === USER_ROLE.STUDENT)
        .map((p) => {
          return new AttendanceEntity(ATTENDANCE_STATUS.ABSENT, {
            studentId: p.id,
            time: convertDateToTimeInMinutes(
              Math.floor(
                convertEpochToDate(new Date().getTime(), 8).getTime() / 1000
              )
            ),
            meetingId: id,
            practicumId: meeting.practicum?.id,
          });
        }) ?? [];

    for (let i = 0; i < attendances.length; i++) {
      const classroom =
        await this.classroomRepository.getClassroomByStudentIdAndPracticumId(
          attendances[i].id!,
          attendances[i].practicumId!
        );

      if (!classroom) {
        throw new NotFoundError(
          ERRORCODE.COMMON_NOT_FOUND,
          "student's classroom is not found"
        );
      }

      attendances[i].classroomId = classroom.id;
    }

    await this.attendanceRepository.insertAttendancesForAllStudentByMeetingId(
      attendances!
    );
  }

  async getAttendancesByMeetingId(
    meetingId: string,
    classroom?: any
  ): Promise<AttendanceEntity[]> {
    return await this.attendanceRepository.getAttendanceByMeetingIdOrClassroom(
      meetingId,
      classroom
    );
  }

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

    const classroom =
      await this.classroomRepository.getClassroomByStudentIdAndPracticumId(
        payload.profileId,
        meeting.practicum.id!
      );

    if (!classroom) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "student's classroom is not found"
      );
    }

    const oldAttendance =
      await this.attendanceRepository.getAttendanceByMeetingIdAndStudentId(
        meetingId,
        payload.profileId // studentId
      );

    if (oldAttendance) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "attendance has been made"
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
      classroomId: classroom.id,
      meetingId: meetingId,
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
