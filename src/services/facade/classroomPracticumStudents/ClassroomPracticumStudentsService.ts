import { ClassRoomRepository } from "../../../repository/classroom/ClassroomRepository";
import { ClassroomPracticumStudentsRepository } from "../../../repository/facade/classroomPracticumStudents/ClassroomPracticumStudentsRepository";
import { PracticumClassroomsAndAssistantsRepository } from "../../../repository/facade/practicumClassroomsAndAssistantsRepository/PracticumClassroomsAndAssistantsRepository";
import { UserRepository } from "../../../repository/user/UserRepository";
import { IPutClassroomStudents } from "../../../utils/interfaces/request/IPutClassroomsStudents";

export abstract class ClassroomPracticumStudentsService {
  protected classroomRepository: ClassRoomRepository;
  protected userRepository: UserRepository;
  protected classroomPracticumStudentsRepository: ClassroomPracticumStudentsRepository;

  constructor(repository: {
    classroomPracticumStudentsRepository: ClassroomPracticumStudentsRepository;
    classroomRepository: ClassRoomRepository;
    userRepository: UserRepository;
  }) {
    this.classroomPracticumStudentsRepository =
      repository.classroomPracticumStudentsRepository;
    this.classroomRepository = repository.classroomRepository;
    this.userRepository = repository.userRepository;
  }

  abstract addStudentToClassroom(
    classroomId: string,
    payload: IPutClassroomStudents
  ): Promise<void>;
}
