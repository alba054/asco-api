export abstract class AssistantGroupControlCardRepository {
  abstract removeStudentFromGroupAndControlCard(
    groupId: string,
    username: string
  ): Promise<void>;
}
