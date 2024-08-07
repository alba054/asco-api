import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { AttendanceHandler } from "../handler/AttendanceHandler";

export class AttendanceRouter extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: AttendanceHandler;

  constructor(
    handler: AttendanceHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/attendances");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // * delete attendance by id
    this.router
      .route(this.path + "/:id")
      .delete(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
        ]),
        this.handler.deleteAttendance
      )
      .put(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
        ]),
        this.handler.putAttendance
      )
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
          USER_ROLE.STUDENT,
        ]),
        this.handler.getAttendance
      );

    return this.router;
  }
}
