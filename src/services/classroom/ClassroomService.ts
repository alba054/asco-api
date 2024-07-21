import { ClassroomEntity } from "../../entity/classroom/ClassroomEntity";
import { MeetingEntity } from "../../entity/meeting/MeetingEntity";
import { AssistanceGroupRepository } from "../../repository/assistanceGroup/AssistanceGroupRepository";
import { ClassRoomRepository } from "../../repository/classroom/ClassroomRepository";
import { ClassroomAssistantGroupPracticumRepository } from "../../repository/facade/classroomAssistantGroupPracticumRepository/ClassroomAssistantGroupPracticumRepository";
import { ClassroomPracticumRepository } from "../../repository/facade/classroomPracticumRepository/ClassroomPracticumRepository";
import { MeetingRepository } from "../../repository/meeting/MeetingRepository";
import { UserRepository } from "../../repository/user/UserRepository";
import { IPutClassroomStudents } from "../../utils/interfaces/request/IPutClassroomsStudents";

export abstract class ClassroomService {
  protected classroomRepository: ClassRoomRepository;
  protected userRepository: UserRepository;
  protected meetingRepository: MeetingRepository;
  protected classroomPracticumRepository: ClassroomPracticumRepository;
  protected classroomAssistantGroupPracticumRepository: ClassroomAssistantGroupPracticumRepository;

  constructor(repository: {
    classroomRepository: ClassRoomRepository;
    userRepository: UserRepository;
    meetingRepository: MeetingRepository;
    classroomPracticumRepository: ClassroomPracticumRepository;
    classroomAssistantGroupPracticumRepository: ClassroomAssistantGroupPracticumRepository;
  }) {
    this.classroomRepository = repository.classroomRepository;
    this.userRepository = repository.userRepository;
    this.classroomPracticumRepository = repository.classroomPracticumRepository;
    this.classroomAssistantGroupPracticumRepository =
      repository.classroomAssistantGroupPracticumRepository;
    this.meetingRepository = repository.meetingRepository;
  }

  abstract deleteClassroomById(classroomId: string): Promise<void>;

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
