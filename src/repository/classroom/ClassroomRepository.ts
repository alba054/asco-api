import { ClassroomEntity } from "../../entity/classroom/ClassroomEntity";
import { IPutClassroomStudents } from "../../utils/interfaces/request/IPutClassroomsStudents";

export abstract class ClassRoomRepository {
  abstract getClassroomByStudentUsername(
    username: string
  ): Promise<ClassroomEntity[]>;

  abstract removeStudentFromClassroom(
    classroomId: string,
    username: string
  ): Promise<void>;

  abstract getClassroomById(
    classroomId: string
  ): Promise<ClassroomEntity | null>;

  abstract addStudents(
    classroomId: string,
    payload: IPutClassroomStudents
  ): Promise<void>;
}
