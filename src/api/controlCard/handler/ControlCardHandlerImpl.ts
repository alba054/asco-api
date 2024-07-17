import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ControlCardHandler } from "./ControlCardHandler";
import { ControlCardService } from "../../../services/controlCard/ControlCardService";
import { USER_ROLE } from "@prisma/client";
import { ControlCardEntity } from "../../../entity/controlCard/ControlCardEntity";
import { ControlCardDTO } from "../../../utils/dto/controlCard/IControlCardDTO";

export class ControlCardHandlerImpl extends ControlCardHandler {
  private schemaValidator: SchemaValidator;
  private controlCardService: ControlCardService;

  constructor(
    service: { controlCardService: ControlCardService },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.controlCardService = service.controlCardService;
    this.schemaValidator = schemaValidator;
  }

  async getControlCard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { cardId } = req.params;
    const { profileId, userRole } = getTokenPayload(res);

    try {
      let card: ControlCardEntity | null = null;

      if (userRole === USER_ROLE.ASSISTANT) {
        card = await this.controlCardService.getControlCardById(cardId);
      } else {
        card = await this.controlCardService.getControlCardById(
          cardId,
          profileId
        );
      }

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, ControlCardDTO(card)));
    } catch (error) {
      return next(error);
    }
  }
}
