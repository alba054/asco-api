import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { AssistanceGroupHandler } from "../handler/AssistanceGroupHandler";

export class AssistanceGroupRouterImpl extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: AssistanceGroupHandler;

  constructor(
    handler: AssistanceGroupHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/groups");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // * delete assistance group
    // * get group detail
    // * edit group
    this.router
      .route(this.path + "/:groupId")
      .delete(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.deleteAssistanceGroup
      )
      .get(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.getAssistanceGroup
      )
      .put(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.putAssistanceGroup
      );

    // * remove student from assistantGroup
    this.router
      .route(this.path + "/:groupId/students/:username")
      .delete(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.deleteStudentFromAssistantGroup
      );

    return this.router;
  }
}
