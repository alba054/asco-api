import { AssistanceEntity } from "../../entity/assistance/AssistanceEntity";

export abstract class AssistanceRepository {
  abstract updateAssistanceById(
    updatedAssistance: AssistanceEntity
  ): Promise<void>;
  abstract getAssistanceById(id: string): Promise<AssistanceEntity | null>;
}
