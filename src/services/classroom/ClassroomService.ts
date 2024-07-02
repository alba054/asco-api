import { ClassroomEntity } from "../../entity/classroom/ClassroomEntity";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { ClassRoomRepository } from "../../repository/classroom/ClassroomRepository";
import { MeetingRepository } from "../../repository/meeting/MeetingRepository";
import { UserRepository } from "../../repository/user/UserRepository";
import { IPutClassroomStudents } from "../../utils/interfaces/request/IPutClassroomsStudents";

export abstract class ClassroomService {
  protected classroomRepository: ClassRoomRepository;
  protected userRepository: UserRepository;
  protected meetingRepository: MeetingRepository;

  constructor(repository: {
    classroomRepository: ClassRoomRepository;
    userRepository: UserRepository;
    meetingRepository: MeetingRepository;
  }) {
    this.classroomRepository = repository.classroomRepository;
    this.userRepository = repository.userRepository;
    this.meetingRepository = repository.meetingRepository;
  }

  abstract getStudentClassroomMeetingsById(
    classroomId: string,
    username: string
  ): Promise<MeetingEntity[]>;

  abstract getClassroomsByStudentUsername(
    username: string
  ): Promise<ClassroomEntity[]>;

  abstract getClassroomById(classroomId: string): Promise<ClassroomEntity>;

  abstract removeStudentFromClassroom(
    classroomId: string,
    username: string
  ): Promise<void>;

  abstract addStudentToClassroom(
    classroomId: string,
    payload: IPutClassroomStudents
  ): Promise<void>;
}
