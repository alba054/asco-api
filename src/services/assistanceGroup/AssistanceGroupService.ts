import { MessagingInterface } from "../../config/messaging/MessagingInterface";
import { AssistanceGroupEntity } from "../../entity/assistanceGroup/AssistanceGroupEntity";
import { AssistanceGroupRepository } from "../../repository/assistanceGroup/AssistanceGroupRepository";
import { AssistanceGroupAssistanceRepository } from "../../repository/facade/assistanceGroupAssistanceRepository/AssistanceGroupAssistanceRepository";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { IPostClassroomAssistanceGroupPayload } from "../../utils/interfaces/request/IPostClassroomAssistanceGroupPayload";
import { IPutAssistanceGroupPayload } from "../../utils/interfaces/request/IPutAssistanceGroupPayload";
import { IControlCardPayload } from "../../utils/interfaces/schema/IControlCardPayload";

export abstract class AssistanceGroupService {
  protected practicumRepository: PracticumRepository;
  protected assistanceGroupRepository: AssistanceGroupRepository;
  protected messagingService?: MessagingInterface<IControlCardPayload[]>;
  protected assistanceGroupAssistanceRepository: AssistanceGroupAssistanceRepository;

  constructor(
    repository: {
      practicumRepository: PracticumRepository;
      assistanceGroupRepository: AssistanceGroupRepository;
      assistanceGroupAssistanceRepository: AssistanceGroupAssistanceRepository;
    },
    messaging?: MessagingInterface<IControlCardPayload[]>
  ) {
    this.practicumRepository = repository.practicumRepository;
    this.assistanceGroupAssistanceRepository =
      repository.assistanceGroupAssistanceRepository;
    this.assistanceGroupRepository = repository.assistanceGroupRepository;
    this.messagingService = messaging;
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
