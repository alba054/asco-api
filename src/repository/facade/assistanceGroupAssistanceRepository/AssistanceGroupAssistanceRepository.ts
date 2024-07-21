export abstract class AssistanceGroupAssistanceRepository {
  abstract deleteGroupAndAssistanceByGroupId(groupId: string): Promise<void>;
}
