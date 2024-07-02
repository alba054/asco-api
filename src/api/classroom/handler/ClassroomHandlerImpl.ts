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
import { IPutClassroomStudents } from "../../../utils/interfaces/request/IPutClassroomsStudents";
import { ClassroomStudentsPutPayloadSchema } from "../../../utils/validator/classroom/Joi/ClassroomStudentsPutPayloadSchema";
import { ClassroomService } from "../../../services/classroom/ClassroomService";
import { ClassroomDTO } from "../../../utils/dto/classroom/IClassroomDTO";
import { MeetingService } from "../../../services/meeting/MeetingService";
import { ITokenPayload } from "../../../utils/interfaces/ITokenPayload";
import { ListClassroomDTO } from "../../../utils/dto/classroom/IListClassroomDTO";
import { ListMeetingDTO } from "../../../utils/dto/meeting/IListMeetingDTO";

export class ClassroomHandlerImpl extends ClassRoomHandler {
  private classroomService: ClassroomService;
  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      classroomService: ClassroomService;
      meetingService: MeetingService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.classroomService = service.classroomService;
    this.schemaValidator = schemaValidator;
  }

  async getStudentClassroomAssistanceGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { classroomId } = req.params;
  }

  async getClassroomMeetings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { classroomId } = req.params;

    try {
      const meetings =
        await this.classroomService.getStudentClassroomMeetingsById(
          classroomId,
          tokenPayload.username
        );

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, meetings.map(ListMeetingDTO))
        );
    } catch (error) {
      return next(error);
    }
  }

  async getStudentClassrooms(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const tokenPayload: ITokenPayload = getTokenPayload(res);

    try {
      const classrooms =
        await this.classroomService.getClassroomsByStudentUsername(
          tokenPayload.username
        );

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            classrooms.map(ListClassroomDTO)
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getClassroom(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { classroomId } = req.params;

    try {
      const classroom = await this.classroomService.getClassroomById(
        classroomId
      );

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, ClassroomDTO(classroom))
        );
    } catch (error) {
      return next(error);
    }
  }

  async deleteStudentFromClassroom(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { username, classroomId } = req.params;

    try {
      await this.classroomService.removeStudentFromClassroom(
        classroomId,
        username
      );

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully remove student from classroom"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async putStudentToClassroom(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { classroomId } = req.params;
    const payload: IPutClassroomStudents = req.body;

    try {
      this.schemaValidator.validate({
        schema: ClassroomStudentsPutPayloadSchema,
        payload,
      });

      await this.classroomService.addStudentToClassroom(classroomId, payload);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully assign students to classroom"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
