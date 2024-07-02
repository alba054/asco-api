import { Router } from "express";
import { BasicAuthMiddleware } from "../../../middleware/auth/BasicAuth";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { PracticumHandler } from "../handler/PracticumHandler";
import { GetPracticumMeetingsMiddleware } from "../../../middleware/api/GetPracticumMeetingMiddleware";
import { GetPracticumAssistanceGroupMiddleware } from "../../../middleware/api/GetPracticumAssistanceGroupMiddleware";

export class PracticumRouterImpl extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: PracticumHandler;
  private getPracticumMeetingsMiddleware: GetPracticumMeetingsMiddleware;
  private getPracticumAssistanceGroupMiddleware: GetPracticumAssistanceGroupMiddleware;

  constructor(
    handler: PracticumHandler,
    authorizationMiddleware: AuthorizationBearer,
    getPracticumMeetingsMiddleware: GetPracticumMeetingsMiddleware,
    getPracticumAssistanceGroupMiddleware: GetPracticumAssistanceGroupMiddleware
  ) {
    super("/practicums");
    this.handler = handler;
    this.getPracticumMeetingsMiddleware = getPracticumMeetingsMiddleware;
    this.getPracticumAssistanceGroupMiddleware =
      getPracticumAssistanceGroupMiddleware;
    this.authorizationMiddlware = authorizationMiddleware;
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
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
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

    // * assign assistants and classrooms to practicum
    this.router
      .route(this.path + "/:practicumId/extras")
      .post(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.postAssitantsAndClassrooms
      );

    return this.router;
  }
}
