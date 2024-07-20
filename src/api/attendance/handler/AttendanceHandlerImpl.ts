import { Request, Response, NextFunction } from "express";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AttendanceService } from "../../../services/attendance/AttendanceService";
import { AttendanceHandler } from "./AttendanceHandler";

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
