import { ATTENDANCE_STATUS } from "@prisma/client";

export interface IPostMeetingAttendancePayload {
  readonly profileId: string;
  readonly attendanceStatus: ATTENDANCE_STATUS;
  readonly extraPoint?: number;
  readonly note?: string;
}
