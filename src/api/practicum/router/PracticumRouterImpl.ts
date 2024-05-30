import { Router } from "express";
import { BasicAuthMiddleware } from "../../../middleware/auth/BasicAuth";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { PracticumHandler } from "../handler/PracticumHandler";

export class PracticumRouterImpl extends BaseRouter {
  private basicAuthMiddleware: BasicAuthMiddleware;
  private authorizationMiddlware: AuthorizationBearer;
  private handler: PracticumHandler;

  constructor(
    handler: PracticumHandler,
    basicAuthMiddleware: BasicAuthMiddleware,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/practicums");
    this.handler = handler;
    this.basicAuthMiddleware = basicAuthMiddleware;
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
