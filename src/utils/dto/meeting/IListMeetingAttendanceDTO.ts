import { ATTENDANCE_STATUS } from "@prisma/client";
import { MeetingEntity } from "../../../entity/meeting/MeetingEntity";

interface IListMeetingAttendanceDTO {
  lesson: string;
  number: number;
  meetingDate: number;
  sick: number;
  attend: number;
  absent: number;
  permission: number;
}

export const ListMeetingAttendanceDTO = (meeting: MeetingEntity) => {
  return {
    absent:
      meeting.attendances?.filter(
        (a) => a.attendanceStatus === ATTENDANCE_STATUS.ABSENT
      ).length ?? 0,
    sick:
      meeting.attendances?.filter(
        (a) => a.attendanceStatus === ATTENDANCE_STATUS.SICK
      ).length ?? 0,
    permission:
      meeting.attendances?.filter(
        (a) => a.attendanceStatus === ATTENDANCE_STATUS.PERMISSION
      ).length ?? 0,
    attend:
      meeting.attendances?.filter(
        (a) => a.attendanceStatus === ATTENDANCE_STATUS.ATTEND
      ).length ?? 0,
    lesson: meeting.lesson,
    meetingDate: meeting.meetingDate,
    number: meeting.number,
  } as IListMeetingAttendanceDTO;
};
