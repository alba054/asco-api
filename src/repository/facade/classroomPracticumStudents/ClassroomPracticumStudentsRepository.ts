import { IPutClassroomStudents } from "../../../utils/interfaces/request/IPutClassroomsStudents";

export abstract class ClassroomPracticumStudentsRepository {
  abstract addStudentsToClassroomAndPracticum(
    classroomId: string,
    practicumId: string,
    payload: IPutClassroomStudents
  ): Promise<void>;
}
