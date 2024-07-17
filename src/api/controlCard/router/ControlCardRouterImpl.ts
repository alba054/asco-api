import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { ControlCardHandler } from "../handler/ControlCardHandler";

export class ControlCardRouter extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: ControlCardHandler;

  constructor(
    handler: ControlCardHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/cards");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // * get control card detail
    this.router
      .route(this.path + "/:cardId")
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.STUDENT,
          USER_ROLE.ASSISTANT,
        ]),
        this.handler.getControlCard
      );

    return this.router;
  }
}
