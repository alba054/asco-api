import { ATTENDANCE_STATUS } from "@prisma/client";
import { AttendanceEntity } from "../../../entity/attendance/AttendanceEntity";

interface IListAttendanceDTO {
  id: string;
  attendanceStatus: ATTENDANCE_STATUS;
  time: number;
  meeting: {
    id: string;
    lesson: string;
    number: number;
    meetingDate: number;
  };
  extraPoint: number;
  note?: string;
}

export const ListAttendanceDTO = (attendance: AttendanceEntity) => {
  return {
    id: attendance.id,
    attendanceStatus: attendance.attendanceStatus,
    time: attendance.time,
    meeting: {
      id: attendance.meeting?.id,
      lesson: attendance.meeting?.lesson,
      meetingDate: attendance.meeting?.meetingDate,
      number: attendance.meeting?.number,
    },
    extraPoint: attendance.extraPoint,
    note: attendance.note ?? null,
  } as IListAttendanceDTO;
};
