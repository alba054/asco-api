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
}

export const ListAttendanceDTO = (attendance: AttendanceEntity) => {
  return {
    id: attendance.id,
    attendanceStatus: attendance.attendanceStatus,
    meeting: {
      id: attendance.meeting?.id,
      lesson: attendance.meeting?.lesson,
      meetingDate: attendance.meeting?.meetingDate,
      number: attendance.meeting?.number,
    },
  } as IListAttendanceDTO;
};
