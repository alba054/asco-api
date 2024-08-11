import { Request, Response, NextFunction } from "express";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { AssistanceHandler } from "./AssistanceHandler";
import { AssistanceDTO } from "../../../utils/dto/assistance/IAssistanceDTO";
import { AssistanceService } from "../../../services/assistance/AssistanceService";
import {
  createResponse,
  getTokenPayload,
  RESPONSE_MESSAGE,
} from "../../../utils";
import { IPutAssistancePayload } from "../../../utils/interfaces/request/IPutAssistancePayload";
import { AssistancePutPayloadSchema } from "../../../utils/validator/assistance/AssistancePutPayloadSchema";

export class AssistanceHandlerImpl extends AssistanceHandler {
  private schemaValidator: SchemaValidator;
  private assistanceService: AssistanceService;

  constructor(
    service: { assistanceService: AssistanceService },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.assistanceService = service.assistanceService;
    this.schemaValidator = schemaValidator;
  }

  async putAssistance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const payload: IPutAssistancePayload = req.body;
    const { profileId } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: AssistancePutPayloadSchema,
        payload,
      });

      await this.assistanceService.updateAssistanceById(id, payload, profileId);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully update assistance"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getAssistance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;

    try {
      const assistance = await this.assistanceService.getAssistanceById(id);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, AssistanceDTO(assistance))
        );
    } catch (error) {
      return next(error);
    }
  }
}
