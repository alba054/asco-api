import { AttendanceEntity } from "../../entity/attendance/AttendanceEntity";
import { AttendanceRepository } from "../../repository/attendance/AttendanceRepository";
import { ClassRoomRepository } from "../../repository/classroom/ClassroomRepository";
import { MeetingRepository } from "../../repository/meeting/MeetingRepository";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { IPostMeetingAttendancePayload } from "../../utils/interfaces/request/IPostMeetingAttendancePayload";

export abstract class AttendanceService {
  protected attendanceRepository: AttendanceRepository;
  protected practicumRepository: PracticumRepository;
  protected meetingRepository: MeetingRepository;
  protected classroomRepository: ClassRoomRepository;

  constructor(repository: {
    practicumRepository: PracticumRepository;
    attendanceRepository: AttendanceRepository;
    meetingRepository: MeetingRepository;
    classroomRepository: ClassRoomRepository;
  }) {
    this.attendanceRepository = repository.attendanceRepository;
    this.practicumRepository = repository.practicumRepository;
    this.meetingRepository = repository.meetingRepository;
    this.classroomRepository = repository.classroomRepository;
  }

  abstract addAttendancesForAllStudentsByMeetingId(id: string): Promise<void>;

  abstract getAttendancesByMeetingId(
    meetingId: string,
    classroom?: any
  ): Promise<AttendanceEntity[]>;

  abstract deleteAttendanceById(id: string): Promise<void>;

  abstract addAttendance(
    meetingId: string,
    payload: IPostMeetingAttendancePayload,
    assistantId: string
  ): Promise<void>;

  abstract getAttendancesByPracticumIdAndProfileId(
    practicumId: string,
    profileId: string
  ): Promise<AttendanceEntity[]>;
}
