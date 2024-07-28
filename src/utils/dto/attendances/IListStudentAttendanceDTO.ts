import { ATTENDANCE_STATUS } from "@prisma/client";
import { AttendanceEntity } from "../../../entity/attendance/AttendanceEntity";
import { constants } from "../..";

interface IListStudentAttendanceDTO {
  student: {
    id: string;
    profilePic: string;
    username: string;
    fullname: string;
    nickname: string;
  };
  id: string;
  time: number;
  attendanceStatus: ATTENDANCE_STATUS;
}

export const ListStudentAttendanceDTO = (attendance: AttendanceEntity) => {
  return {
    attendanceStatus: attendance.attendanceStatus,
    id: attendance.id,
    student: {
      fullname: attendance.student?.fullname,
      id: attendance.student?.id,
      nickname: attendance.student?.nickname,
      profilePic:
        constants.GCS_OBJECT_BASE(attendance.student?.profilePic) ?? null,
      username: attendance.student?.username,
    },
  } as IListStudentAttendanceDTO;
};
