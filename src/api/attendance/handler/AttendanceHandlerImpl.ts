import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { AttendanceService } from "../../../services/attendance/AttendanceService";
import { AttendanceHandler } from "./AttendanceHandler";
import { IPutAttendancePayload } from "../../../utils/interfaces/request/IPutAttendancePayload";
import { MeetingAttendancePutPayloadSchema } from "../../../utils/validator/attendance/Joi/MeetingAttendancePutPayloadSchema";
import { AttendanceDTO } from "../../../utils/dto/attendances/IAttendanceDTO";

export class AttendanceHandlerImpl extends AttendanceHandler {
  private attendanceService: AttendanceService;
  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      attendanceService: AttendanceService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.attendanceService = service.attendanceService;
    this.schemaValidator = schemaValidator;
  }

  async getAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    try {
      const attendance = await this.attendanceService.getAttendanceById(id);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, AttendanceDTO(attendance))
        );
    } catch (error) {
      return next(error);
    }
  }

  async putAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const payload: IPutAttendancePayload = req.body;
    const { profileId } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: MeetingAttendancePutPayloadSchema,
        payload,
      });

      await this.attendanceService.updateAttendanceById(id, payload, profileId);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully update attendance"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async deleteAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;

    try {
      await this.attendanceService.deleteAttendanceById(id);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "delete attendance succesfully"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
