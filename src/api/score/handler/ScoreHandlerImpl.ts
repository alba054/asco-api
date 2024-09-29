import { Request, Response, NextFunction } from "express";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { ScoreHandler } from "./ScoreHandler";
import {
  createResponse,
  getTokenPayload,
  RESPONSE_MESSAGE,
} from "../../../utils";
import { ScoreService } from "../../../services/score/ScoreService";
import { IPutPracticumExamScore } from "../../../utils/interfaces/request/IPutPracticumScore";
import { MeetingScorePutPayloadSchema } from "../../../utils/validator/score/MeetingResponseScorePutPayloadSchema";

export class ScoreHandlerImpl extends ScoreHandler {
  private schemaValidator: SchemaValidator;
  private scoreService: ScoreService;

  constructor(
    service: { scoreService: ScoreService },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.scoreService = service.scoreService;
    this.schemaValidator = schemaValidator;
  }

  async putExamScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const payload: IPutPracticumExamScore = req.body;

    try {
      this.schemaValidator.validate({
        schema: MeetingScorePutPayloadSchema,
        payload,
      });

      await this.scoreService.updateExamScoreById(id, payload);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully update score")
        );
    } catch (error) {
      return next(error);
    }
  }

  async putScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const payload: IPutPracticumExamScore = req.body;

    try {
      this.schemaValidator.validate({
        schema: MeetingScorePutPayloadSchema,
        payload,
      });

      await this.scoreService.updateScoreById(id, payload);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully update score")
        );
    } catch (error) {
      return next(error);
    }
  }
}
