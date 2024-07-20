import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { PracticumHandler } from "../handler/PracticumHandler";
import { GetPracticumMeetingsMiddleware } from "../../../middleware/api/GetPracticumMeetingMiddleware";
import { GetPracticumAssistanceGroupMiddleware } from "../../../middleware/api/GetPracticumAssistanceGroupMiddleware";
import { GetPracticumsMiddleware } from "../../../middleware/api/GetPracticumsMiddleware";

export class PracticumRouterImpl extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: PracticumHandler;
  private getPracticumMeetingsMiddleware: GetPracticumMeetingsMiddleware;
  private getPracticumAssistanceGroupMiddleware: GetPracticumAssistanceGroupMiddleware;
  private getPracticumsMiddleware: GetPracticumsMiddleware;

  constructor(
    handler: PracticumHandler,
    authorizationMiddleware: AuthorizationBearer,
    getPracticumMeetingsMiddleware: GetPracticumMeetingsMiddleware,
    getPracticumAssistanceGroupMiddleware: GetPracticumAssistanceGroupMiddleware,
    getPracticumsMiddleware: GetPracticumsMiddleware
  ) {
    super("/practicums");
    this.handler = handler;
    this.getPracticumMeetingsMiddleware = getPracticumMeetingsMiddleware;
    this.getPracticumAssistanceGroupMiddleware =
      getPracticumAssistanceGroupMiddleware;
    this.authorizationMiddlware = authorizationMiddleware;
    this.getPracticumsMiddleware = getPracticumsMiddleware;
  }

  register(): Router {
    // * create practicums
    // * get practicums
    this.router
      .route(this.path)
      .post(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.postPracticum
      )
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.STUDENT,
          USER_ROLE.ASSISTANT,
        ]),
        this.getPracticumsMiddleware.getPracticumsByRole,
        this.handler.getPracticums
      );

    // * get practicum detail
    // * edit practicum
    // * delete practicum
    this.router
      .route(this.path + "/:practicumId")
      .get(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.getPracticum
      )
      .put(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.putPracticum
      )
      .delete(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.deletePracticum
      );

    // * create meetings for practicum
    // * get practicum meetings
    this.router
      .route(this.path + "/:practicumId/meetings")
      .post(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.postMeetingToPracticum
      )
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
          USER_ROLE.STUDENT,
        ]),
        this.getPracticumMeetingsMiddleware.checkAuthorizeRole,
        this.handler.getPracticumMeetings
      );

    // * get assistance group
    // * create assistance group
    this.router
      .route(this.path + "/:practicumId/groups")
      .post(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.postPracticumAssistanceGroups
      )
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.STUDENT,
          USER_ROLE.ASSISTANT,
        ]),
        this.getPracticumAssistanceGroupMiddleware.getPracticumAssistanceGroups,
        this.handler.getPracticumAssistanceGroups
      );

    // * get student practicum control card
    this.router
      .route(this.path + "/:practicumId/cards")
      .get(
        this.authorizationMiddlware.authorize([USER_ROLE.STUDENT]),
        this.handler.getPracticumControlCards
      );

    // * get student practicum attendances history
    this.router
      .route(this.path + "/:practicumId/attendances")
      .get(
        this.authorizationMiddlware.authorize([USER_ROLE.STUDENT]),
        this.handler.getPracticumAttendances
      );

    // * assign assistants and classrooms to practicum
    this.router
      .route(this.path + "/:practicumId/extras")
      .post(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.postAssitantsAndClassrooms
      );

    // * get student control card in practicum by admin and assistant
    this.router
      .route(this.path + "/:practicumId/students/:id/cards")
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
        ]),
        this.handler.getStudentPracticumControlCards
      );

    // * get student practicum attendances history by admin and assistant
    this.router
      .route(this.path + "/:practicumId/students/:id/attendances")
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
        ]),
        this.handler.getStudentPracticumAttendances
      );

    return this.router;
  }
}
