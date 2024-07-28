import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { MeetingHandler } from "../handler/MeetingHandler";
import { GetMeetingMiddleware } from "../../../middleware/api/GetMeetingMiddleware";

export class MeetingRouter extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: MeetingHandler;
  private getMeetingMiddleware: GetMeetingMiddleware;

  constructor(
    handler: MeetingHandler,
    authorizationMiddleware: AuthorizationBearer,
    getMeetingMiddleware: GetMeetingMiddleware
  ) {
    super("/meetings");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
    this.getMeetingMiddleware = getMeetingMiddleware;
  }

  register(): Router {
    // * delete meeting by id
    this.router
      .route(this.path + "/:id")
      .delete(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.deleteMeeting
      )
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.STUDENT,
        ]),
        this.getMeetingMiddleware.checkAuthorizedRole,
        this.handler.getMeeting
      )
      .put(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.putMeeting
      );

    // * create attendance of a meeting
    // * get attendances by meeting id
    this.router
      .route(this.path + "/:id/attendances")
      .post(
        this.authorizationMiddlware.authorize([USER_ROLE.ASSISTANT]),
        this.handler.postMeetingAttendance
      )
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ASSISTANT,
          USER_ROLE.ADMIN,
        ]),
        this.handler.getMeetingAttendances
      );

    // * post all student attendances in one meeting
    this.router
      .route(this.path + "/:id/attendances/v2")
      .post(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ASSISTANT,
          USER_ROLE.ADMIN,
        ]),
        this.handler.postMeetingAttendances
      );

    return this.router;
  }
}
