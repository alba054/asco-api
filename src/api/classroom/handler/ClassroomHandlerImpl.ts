import { Request, Response, NextFunction } from "express";
import { ClassRoomHandler } from "./ClassroomHandler";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ITokenPayload } from "../../../utils/interfaces/ITokenPayload";
import { PracticumService } from "../../../services/practicum/PracticumService";
import { IPostPracticumPayload } from "../../../utils/interfaces/request/IPostPracticumPayload";
import { PracticumPostPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumPostPayloadSchema";
import { listPracticumDTO } from "../../../utils/dto/practicum/IListPracticumDTO";
import { PracticumDTO } from "../../../utils/dto/practicum/IPracticumDTO";
import { IPutPracticumPayload } from "../../../utils/interfaces/request/IPutPracticumPayload";
import { PracticumPutPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumPutPayloadSchema copy";

export class ClassroomHandlerImpl extends ClassRoomHandler {
  private practicumService: PracticumService;
  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      practicumService: PracticumService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.practicumService = service.practicumService;
    this.schemaValidator = schemaValidator;
  }
}
