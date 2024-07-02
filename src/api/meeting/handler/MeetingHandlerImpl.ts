import { Request, Response, NextFunction } from "express";
import { RESPONSE_MESSAGE, createResponse } from "../../../utils";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { MeetingService } from "../../../services/meeting/MeetingService";
import { MeetingHandler } from "./MeetingHandler";
import { MeetingDTO } from "../../../utils/dto/meeting/IMeetingDTO";
import { IPutClassroomMeetingPayload } from "../../../utils/interfaces/request/IPutClassroomMeetingPayload";
import { PracticumMeetingPutPayloadSchema } from "../../../utils/validator/meeting/Joi/PracticumMeetingPutPayloadSchema";

export class MeetingHandlerImpl extends MeetingHandler {
  private meetingService: MeetingService;
  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      meetingService: MeetingService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.meetingService = service.meetingService;
    this.schemaValidator = schemaValidator;
  }

  async putMeeting(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const payload: IPutClassroomMeetingPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: PracticumMeetingPutPayloadSchema,
        payload,
      });

      await this.meetingService.editMeetingById(id, payload);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully edit meeting")
        );
    } catch (error) {
      return next(error);
    }
  }

  async getMeeting(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;

    try {
      const meeting = await this.meetingService.getMeetingById(id);

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, MeetingDTO(meeting)));
    } catch (error) {
      return next(error);
    }
  }

  async deleteMeeting(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;

    try {
      await this.meetingService.deleteMeetingById(id);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "delete meeting succesfully")
        );
    } catch (error) {
      return next(error);
    }
  }
}
