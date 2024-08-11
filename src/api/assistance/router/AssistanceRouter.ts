import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { AssistanceHandler } from "../handler/AssistanceHandler";

export class AssistanceRouterImpl extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: AssistanceHandler;

  constructor(
    handler: AssistanceHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/assistances");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // *get assistance detail
    // *update assistance detail
    this.router
      .route(this.path + "/:id")
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ASSISTANT,
          USER_ROLE.ADMIN,
          USER_ROLE.STUDENT,
        ]),
        this.handler.getAssistance
      )
      .put(
        this.authorizationMiddlware.authorize([USER_ROLE.ASSISTANT]),
        this.handler.putAssistance
      );

    return this.router;
  }
}
