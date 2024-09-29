import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { ScoreHandler } from "../handler/ScoreHandler";

export class ScoreRouterImpl extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: ScoreHandler;

  constructor(
    handler: ScoreHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/scores");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // * update score
    this.router
      .route(this.path + "/:id")
      .put(
        this.authorizationMiddlware.authorize([USER_ROLE.ASSISTANT]),
        this.handler.putScore
      );

    // * update exam score
    this.router
      .route(this.path + "/:id/exams")
      .put(
        this.authorizationMiddlware.authorize([USER_ROLE.ASSISTANT]),
        this.handler.putExamScore
      );

    return this.router;
  }
}
