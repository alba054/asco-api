import { Request, Response, NextFunction } from "express";
import { PracticumHandler } from "./PracticumHandler";
import { RESPONSE_MESSAGE, createResponse } from "../../../utils";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { PracticumService } from "../../../services/practicum/PracticumService";
import { IPostPracticumPayload } from "../../../utils/interfaces/request/IPostPracticumPayload";
import { PracticumPostPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumPostPayloadSchema";
import { listPracticumDTO } from "../../../utils/dto/practicum/IListPracticumDTO";
import { PracticumDTO } from "../../../utils/dto/practicum/IPracticumDTO";
import { IPutPracticumPayload } from "../../../utils/interfaces/request/IPutPracticumPayload";
import { PracticumPutPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumPutPayloadSchema copy";
import { IPostPracticumClassroomsAndAssistants } from "../../../utils/interfaces/request/IPostPracticumClassroomsAndAssistants";
import { PracticumClassroomsAndAssistantsPostPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumClassroomsAndAssistantsPostPayloadSchema";
import { PracticumClassroomsAndAssistantsService } from "../../../services/facade/practicumClassroomsAndAssistantsService/PracticumClassroomsAndAssistantsService";

export class PracticumHandlerImpl extends PracticumHandler {
  private practicumService: PracticumService;
  private schemaValidator: SchemaValidator;
  private practicumClassroomsAndAssistantsService: PracticumClassroomsAndAssistantsService;

  constructor(
    service: {
      practicumService: PracticumService;
      practicumClassroomsAndAssistantsService: PracticumClassroomsAndAssistantsService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.practicumService = service.practicumService;
    this.practicumClassroomsAndAssistantsService =
      service.practicumClassroomsAndAssistantsService;
    this.schemaValidator = schemaValidator;
  }

  async postAssitantsAndClassrooms(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;
    const payload: IPostPracticumClassroomsAndAssistants = req.body;

    try {
      this.schemaValidator.validate({
        schema: PracticumClassroomsAndAssistantsPostPayloadSchema,
        payload,
      });

      await this.practicumClassroomsAndAssistantsService.addClassroomsAndAsistantsPracticum(
        practicumId,
        payload
      );

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add classrooms and assistants"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async deletePracticum(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;

    try {
      await this.practicumService.deletePracticumById(practicumId);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "delete practicum succesfully"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async putPracticum(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;
    const payload: IPutPracticumPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: PracticumPutPayloadSchema,
        payload,
      });

      const id = await this.practicumService.updatePracticumById(
        practicumId,
        payload
      );

      return res.status(200).json(createResponse(RESPONSE_MESSAGE.SUCCESS, id));
    } catch (error) {
      return next(error);
    }
  }

  async getPracticum(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;

    try {
      const practicum = await this.practicumService.getPracticumById(
        practicumId
      );

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, PracticumDTO(practicum))
        );
    } catch (error) {
      return next(error);
    }
  }

  async getPracticums(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const practicums = await this.practicumService.getPracticums();

    return res
      .status(200)
      .json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          practicums.map(listPracticumDTO)
        )
      );
  }

  async postPracticum(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const payload: IPostPracticumPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: PracticumPostPayloadSchema,
        payload,
      });

      const id = await this.practicumService.addNewPracticum(payload);

      return res.status(201).json(createResponse(RESPONSE_MESSAGE.SUCCESS, id));
    } catch (error) {
      return next(error);
    }
  }
}
