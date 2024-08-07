import { ATTENDANCE_STATUS } from "@prisma/client";

export interface IPutAttendancePayload {
  readonly attendanceStatus?: ATTENDANCE_STATUS;
  readonly extraPoint?: number;
  readonly note?: string;
}
