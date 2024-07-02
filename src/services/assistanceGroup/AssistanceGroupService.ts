import { AssistanceGroupEntity } from "../../entity/assistanceGroup/AssistanceGroupEntity";
import { AssistanceGroupRepository } from "../../repository/assistanceGroup/AssistanceGroupRepository";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { IPostClassroomAssistanceGroupPayload } from "../../utils/interfaces/request/IPostClassroomAssistanceGroupPayload";
import { IPutAssistanceGroupPayload } from "../../utils/interfaces/request/IPutAssistanceGroupPayload";

export abstract class AssistanceGroupService {
  protected practicumRepository: PracticumRepository;
  protected assistanceGroupRepository: AssistanceGroupRepository;

  constructor(repository: {
    practicumRepository: PracticumRepository;
    assistanceGroupRepository: AssistanceGroupRepository;
  }) {
    this.practicumRepository = repository.practicumRepository;
    this.assistanceGroupRepository = repository.assistanceGroupRepository;
  }

  abstract getGroupsByPracticumIdAndUsername(
    practicumId: string,
    username: string
  ): Promise<AssistanceGroupEntity[]>;

  abstract updateAssistanceGroupById(
    groupId: string,
    payload: IPutAssistanceGroupPayload
  ): Promise<void>;

  abstract getGroupById(groupId: string): Promise<AssistanceGroupEntity>;

  abstract deleteAssistanceGroupById(groupId: string): Promise<void>;

  abstract getGroupsByPracticumId(
    practicumId: string
  ): Promise<AssistanceGroupEntity[]>;

  abstract addGroup(
    practicumId: string,
    payload: IPostClassroomAssistanceGroupPayload
  ): Promise<void>;
}
