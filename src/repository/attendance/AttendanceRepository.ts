import { AttendanceEntity } from "../../entity/attendance/AttendanceEntity";

export abstract class AttendanceRepository {
  abstract deleteAttendanceById(id: string): Promise<void>;

  abstract getAttendanceById(id: string): Promise<AttendanceEntity | null>;

  abstract insertAttendance(attendance: AttendanceEntity): Promise<void>;

  abstract getAttendancesByPracticumIdAndProfileId(
    practicumId: string,
    profileId: string
  ): Promise<AttendanceEntity[] | undefined>;
}
