import { ATTENDANCE_STATUS } from "@prisma/client";

export interface IPutMeetingAttendancePayload {
  readonly profileId: string;
  readonly attendanceStatus: ATTENDANCE_STATUS;
  readonly extraPoint?: number;
  readonly note?: string;
}
