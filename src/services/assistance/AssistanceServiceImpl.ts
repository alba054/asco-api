import { AssistanceEntity } from "../../entity/assistance/AssistanceEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPutAssistancePayload } from "../../utils/interfaces/request/IPutAssistancePayload";
import { AssistanceService } from "./AssistanceService";

export class AssistanceServiceImpl extends AssistanceService {
  async updateAssistanceById(
    id: string,
    payload: IPutAssistancePayload,
    profileId: string
  ): Promise<void> {
    const assistance = await this.assistanceRepository.getAssistanceById(id);

    if (!assistance) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "assistance's not found"
      );
    }

    if (profileId !== assistance.controlCard?.group?.assistantId) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "you are not this student's assistant"
      );
    }

    const updatedAssistance = new AssistanceEntity(payload.status, {
      date: payload.date,
      note: payload.note,
      id,
    });

    await this.assistanceRepository.updateAssistanceById(updatedAssistance);
  }

  async getAssistanceById(id: string): Promise<AssistanceEntity> {
    const assistance = await this.assistanceRepository.getAssistanceById(id);

    if (!assistance) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "assistance's not found"
      );
    }

    return assistance;
  }
}
