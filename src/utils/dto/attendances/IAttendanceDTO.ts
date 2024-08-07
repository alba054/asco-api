import { ATTENDANCE_STATUS } from "@prisma/client";
import { AttendanceEntity } from "../../../entity/attendance/AttendanceEntity";
import { constants } from "../..";

interface IAttendanceDTO {
  id: string;
  attendanceStatus: ATTENDANCE_STATUS;
  time: number;
  meeting: {
    id: string;
    lesson: string;
    number: number;
    meetingDate: number;
    module: string;
    assignment: string;
  };
  extraPoint: number;
  note: string;
}

export const AttendanceDTO = (attendance: AttendanceEntity) => {
  return {
    id: attendance.id,
    attendanceStatus: attendance.attendanceStatus,
    meeting: {
      id: attendance.meeting?.id,
      lesson: attendance.meeting?.lesson,
      meetingDate: attendance.meeting?.meetingDate,
      number: attendance.meeting?.number,
      assignment:
        constants.GCS_OBJECT_BASE(attendance.meeting?.assignment) ?? null,
      module: constants.GCS_OBJECT_BASE(attendance.meeting?.module) ?? null,
    },
    time: attendance.time,
  } as IAttendanceDTO;
};
