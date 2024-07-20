export abstract class ClassroomPracticumRepository {
  abstract removeStudentFromPracticumAndClassroom(
    classroomId: string,
    practicumId: any,
    username: string
  ): Promise<void>;
}
