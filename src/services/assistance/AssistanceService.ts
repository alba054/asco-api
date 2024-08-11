import { AssistanceEntity } from "../../entity/assistance/AssistanceEntity";
import { AssistanceRepository } from "../../repository/assistance/AssistanceRepository";
import { IPutAssistancePayload } from "../../utils/interfaces/request/IPutAssistancePayload";

export abstract class AssistanceService {
  protected assistanceRepository: AssistanceRepository;

  constructor(repository: { assistanceRepository: AssistanceRepository }) {
    this.assistanceRepository = repository.assistanceRepository;
  }

  abstract updateAssistanceById(
    id: string,
    payload: IPutAssistancePayload,
    profileId: string
  ): Promise<void>;

  abstract getAssistanceById(id: string): Promise<AssistanceEntity>;
}
