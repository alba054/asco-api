import { Request, Response, NextFunction } from "express";
import { PracticumHandler } from "./PracticumHandler";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { PracticumService } from "../../../services/practicum/PracticumService";
import { IPostPracticumPayload } from "../../../utils/interfaces/request/IPostPracticumPayload";
import { PracticumPostPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumPostPayloadSchema";
import { PracticumDTO } from "../../../utils/dto/practicum/IPracticumDTO";
import { IPutPracticumPayload } from "../../../utils/interfaces/request/IPutPracticumPayload";
import { PracticumPutPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumPutPayloadSchema";
import { IPostPracticumClassroomsAndAssistants } from "../../../utils/interfaces/request/IPostPracticumClassroomsAndAssistants";
import { PracticumClassroomsAndAssistantsPostPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumClassroomsAndAssistantsPostPayloadSchema";
import { PracticumClassroomsAndAssistantsService } from "../../../services/facade/practicumClassroomsAndAssistantsService/PracticumClassroomsAndAssistantsService";
import { IPostClassroomMeetingPayload } from "../../../utils/interfaces/request/IPostClassroomMeetingPayload";
import { PracticumMeetingPostPayloadSchema } from "../../../utils/validator/meeting/Joi/PracticumMeetingPostPayloadSchema";
import { MeetingService } from "../../../services/meeting/MeetingService";
import { ListMeetingDTO } from "../../../utils/dto/meeting/IListMeetingDTO";
import { IPostClassroomAssistanceGroupPayload } from "../../../utils/interfaces/request/IPostClassroomAssistanceGroupPayload";
import { PracticumAssistanceGroupPostPayloadSchema } from "../../../utils/validator/assistanceGroup/Joi/PracticumAssistanceGroupPostPayloadSchema";
import { AssistanceGroupService } from "../../../services/assistanceGroup/AssistanceGroupService";
import { ControlCardService } from "../../../services/controlCard/ControlCardService";
import { ListControlCardDTO } from "../../../utils/dto/controlCard/IListControlCardDTO";
import { USER_ROLE } from "@prisma/client";
import { ControlCardEntity } from "../../../entity/controlCard/ControlCardEntity";
import { ListAttendanceDTO } from "../../../utils/dto/attendances/IListAttendanceDTO";
import { AttendanceService } from "../../../services/attendance/AttendanceService";
import { ListMeetingAttendanceDTO } from "../../../utils/dto/meeting/IListMeetingAttendanceDTO";
import { ScoreService } from "../../../services/score/ScoreService";
import { IPostPracticumExamScore } from "../../../utils/interfaces/request/IPostPracticumExamScore";
import { PracticumExamScorePostPayloadSchema } from "../../../utils/validator/practicum/Joi/PracticumExamScorePostPayloadSchema";

export class PracticumHandlerImpl extends PracticumHandler {
  private practicumService: PracticumService;
  private meetingService: MeetingService;
  private schemaValidator: SchemaValidator;
  private assistanceGroupService: AssistanceGroupService;
  private practicumClassroomsAndAssistantsService: PracticumClassroomsAndAssistantsService;
  private controlCardService: ControlCardService;
  private attendanceService: AttendanceService;
  private scoreService: ScoreService;

  constructor(
    service: {
      practicumService: PracticumService;
      meetingService: MeetingService;
      practicumClassroomsAndAssistantsService: PracticumClassroomsAndAssistantsService;
      assistanceGroupService: AssistanceGroupService;
      controlCardService: ControlCardService;
      attendanceService: AttendanceService;
      scoreService: ScoreService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.practicumService = service.practicumService;
    this.practicumClassroomsAndAssistantsService =
      service.practicumClassroomsAndAssistantsService;
    this.meetingService = service.meetingService;
    this.assistanceGroupService = service.assistanceGroupService;
    this.controlCardService = service.controlCardService;
    this.attendanceService = service.attendanceService;
    this.scoreService = service.scoreService;
    this.schemaValidator = schemaValidator;
  }

  async postPracticumExamScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;
    const payload: IPostPracticumExamScore = req.body;
    const { profileId } = getTokenPayload(res);

    try {
      this.schemaValidator.validate({
        schema: PracticumExamScorePostPayloadSchema,
        payload,
      });

      await this.scoreService.addPracticumExamScore(practicumId, payload, profileId);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully insert exam score"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getPracticumMeetingAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;
    const { classroom } = req.query;

    const attendances =
      await this.meetingService.getMeetingAttendancesByPracticumId(
        practicumId,
        classroom
      );

    return res
      .status(200)
      .json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          attendances.map(ListMeetingAttendanceDTO)
        )
      );
  }

  async deleteAssistantFromPracticum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { username, practicumId } = req.params;

    try {
      await this.practicumService.removeAssistantFromClassroom(
        practicumId,
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

  async getStudentPracticumAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { practicumId, id } = req.params;

    try {
      const attendances =
        await this.attendanceService.getAttendancesByPracticumIdAndProfileId(
          practicumId,
          id
        );

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            attendances.map(ListAttendanceDTO)
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getPracticumAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { profileId } = getTokenPayload(res);
    const { practicumId } = req.params;

    try {
      const attendances =
        await this.attendanceService.getAttendancesByPracticumIdAndProfileId(
          practicumId,
          profileId
        );

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            attendances.map(ListAttendanceDTO)
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getStudentPracticumControlCards(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { practicumId, id } = req.params;
    const { profileId, userRole } = getTokenPayload(res);

    try {
      let card: ControlCardEntity[] = [];

      if (userRole === USER_ROLE.ASSISTANT) {
        card =
          await this.controlCardService.getControlCardsByPracticumAndGroupMentor(
            practicumId,
            id,
            profileId
          );
      } else {
        card =
          await this.controlCardService.getControlCardsByPracticumIdAndProfileId(
            practicumId,
            id
          );
      }

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, card.map(ListControlCardDTO))
        );
    } catch (error) {
      return next(error);
    }
  }

  async getPracticumControlCards(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { profileId } = getTokenPayload(res);
    const { practicumId } = req.params;

    const cards =
      await this.controlCardService.getControlCardsByPracticumIdAndProfileId(
        practicumId,
        profileId
      );

    return res
      .status(200)
      .json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, cards.map(ListControlCardDTO))
      );
  }

  async getPracticumAssistanceGroups(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    try {
      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, res.locals));
    } catch (error) {
      return next(error);
    }
  }

  async postPracticumAssistanceGroups(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;
    const payload: IPostClassroomAssistanceGroupPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: PracticumAssistanceGroupPostPayloadSchema,
        payload,
      });

      await this.assistanceGroupService.addGroup(practicumId, payload);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add group to practicum"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getPracticumMeetings(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;

    try {
      const meetings = await this.meetingService.getMeetingsByPracticumId(
        practicumId
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

  async postMeetingToPracticum(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { practicumId } = req.params;
    const payload: IPostClassroomMeetingPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: PracticumMeetingPostPayloadSchema,
        payload,
      });

      await this.meetingService.addMeeting(practicumId, payload);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add meeting to practicum"
          )
        );
    } catch (error) {
      return next(error);
    }
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
    return res
      .status(200)
      .json(createResponse(RESPONSE_MESSAGE.SUCCESS, res.locals));
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
