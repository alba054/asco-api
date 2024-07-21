export abstract class ClassroomAssistantGroupPracticumRepository {
  abstract deleteClassrooomById(
    classroomId: string,
    practicumId: string,
    students: string[]
  ): Promise<void>;
}
