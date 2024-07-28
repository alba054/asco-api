import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AssistanceGroupService } from "../../../services/assistanceGroup/AssistanceGroupService";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { AssistanceGroupHandler } from "./AssistanceGroupHandler";
import { createResponse, RESPONSE_MESSAGE } from "../../../utils";
import { GroupDTO } from "../../../utils/dto/assistanceGroup/IGroupDTO";
import { IPutAssistanceGroupPayload } from "../../../utils/interfaces/request/IPutAssistanceGroupPayload";
import { AssistanceGroupPutPayloadSchema } from "../../../utils/validator/assistanceGroup/Joi/AssistanceGroupPutPayloadSchema";

export class AssistanceGroupHandlerImpl extends AssistanceGroupHandler {
  private schemaValidator: SchemaValidator;
  private assistanceGroupService: AssistanceGroupService;

  constructor(
    service: {
      assistanceGroupService: AssistanceGroupService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.assistanceGroupService = service.assistanceGroupService;
    this.schemaValidator = schemaValidator;
  }

  async deleteStudentFromAssistantGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { username, groupId } = req.params;

    try {
      await this.assistanceGroupService.removeStudentFromAssistantGroup(
        groupId,
        username
      );

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully remove student from asssitant group"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async putAssistanceGroup(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { groupId } = req.params;
    const payload: IPutAssistanceGroupPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: AssistanceGroupPutPayloadSchema,
        payload,
      });

      await this.assistanceGroupService.updateAssistanceGroupById(
        groupId,
        payload
      );

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "update assistance group succesfully"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getAssistanceGroup(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { groupId } = req.params;

    try {
      const group = await this.assistanceGroupService.getGroupById(groupId);

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, GroupDTO(group)));
    } catch (error) {
      return next(error);
    }
  }

  async deleteAssistanceGroup(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { groupId } = req.params;

    try {
      await this.assistanceGroupService.deleteAssistanceGroupById(groupId);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "delete assistance group succesfully"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
