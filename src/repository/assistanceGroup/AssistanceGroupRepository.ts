import { AssistanceGroupEntity } from "../../entity/assistanceGroup/AssistanceGroupEntity";

export abstract class AssistanceGroupRepository {
  abstract getGroupByPracticumIdAndUsername(
    practicumId: string,
    username: string
  ): Promise<AssistanceGroupEntity[]>;

  abstract updateGroupById(
    groupId: string,
    edittedGroup: AssistanceGroupEntity
  ): Promise<void>;

  abstract deleteGroupById(groupId: string): Promise<void>;

  abstract getGroupById(groupId: string): Promise<AssistanceGroupEntity | null>;

  abstract getGroupByPracticumId(
    practicumId: string
  ): Promise<AssistanceGroupEntity[]>;

  abstract addGroup(group: AssistanceGroupEntity): Promise<string | undefined>;
}
