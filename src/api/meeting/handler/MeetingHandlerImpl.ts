import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { MeetingService } from "../../../services/meeting/MeetingService";
import { MeetingHandler } from "./MeetingHandler";
import { MeetingDTO } from "../../../utils/dto/meeting/IMeetingDTO";
import { IPutClassroomMeetingPayload } from "../../../utils/interfaces/request/IPutClassroomMeetingPayload";
import { PracticumMeetingPutPayloadSchema } from "../../../utils/validator/meeting/Joi/PracticumMeetingPutPayloadSchema";
import { IPostMeetingAttendancePayload } from "../../../utils/interfaces/request/IPostMeetingAttendancePayload";
import { MeetingAttendancePostPayloadSchema } from "../../../utils/validator/attendance/Joi/MeetingAttendancePostPayloadSchema";
import { AttendanceService } from "../../../services/attendance/AttendanceService";
import { ListStudentAttendanceDTO } from "../../../utils/dto/attendances/IListStudentAttendanceDTO";
import { IPostMeetingResponseScore } from "../../../utils/interfaces/request/IPostMeetingResponseScore";
import { MeetingResponseScorePostPayloadSchema } from "../../../utils/validator/score/MeetingResponseScorePostPayloadSchema";
import { ScoreService } from "../../../services/score/ScoreService";

export class MeetingHandlerImpl extends MeetingHandler {
  private meetingService: MeetingService;
  private attendanceService: AttendanceService;
  private scoreService: ScoreService;
  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      meetingService: MeetingService;
      attendanceService: AttendanceService;
      scoreService: ScoreService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.meetingService = service.meetingService;
    this.attendanceService = service.attendanceService;
    this.scoreService = service.scoreService;
    this.schemaValidator = schemaValidator;
  }

  async postMeetingResponseScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const payload: IPostMeetingResponseScore = req.body;
    const { profileId } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: MeetingResponseScorePostPayloadSchema,
        payload,
      });

      await this.scoreService.addResponseScore(id, payload, profileId);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully insert response score"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async postMeetingAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;

    try {
      await this.attendanceService.addAttendancesForAllStudentsByMeetingId(id);

      return res
        .status(201)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully edit meeting")
        );
    } catch (error) {
      return next(error);
    }
  }

  async getMeetingAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const { classroom } = req.query;

    const attendances = await this.attendanceService.getAttendancesByMeetingId(
      id,
      classroom
    );

    return res
      .status(200)
      .json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          attendances.map(ListStudentAttendanceDTO)
        )
      );
  }

  async postMeetingAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const payload: IPostMeetingAttendancePayload = req.body;
    const { profileId } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: MeetingAttendancePostPayloadSchema,
        payload,
      });

      await this.attendanceService.addAttendance(id, payload, profileId);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully edit meeting")
        );
    } catch (error) {
      return next(error);
    }
  }

  async putMeeting(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const payload: IPutClassroomMeetingPayload = req.body;
    const { profileId, userRole } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: PracticumMeetingPutPayloadSchema,
        payload,
      });

      await this.meetingService.editMeetingById(id, payload, {
        assistantId: profileId,
        role: userRole,
      });

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
