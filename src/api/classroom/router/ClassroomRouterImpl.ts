import { Router } from "express";
import { BasicAuthMiddleware } from "../../../middleware/auth/BasicAuth";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { ClassRoomHandler } from "../handler/ClassroomHandler";

export class PracticumRouterImpl extends BaseRouter {
  private basicAuthMiddleware: BasicAuthMiddleware;
  private authorizationMiddlware: AuthorizationBearer;
  private handler: ClassRoomHandler;

  constructor(
    handler: ClassRoomHandler,
    basicAuthMiddleware: BasicAuthMiddleware,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/classes");
    this.handler = handler;
    this.basicAuthMiddleware = basicAuthMiddleware;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // // * create practicums
    // // * get practicums
    // this.router
    //   .route(this.path)
    //   .post(
    //     this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
    //     this.handler.postPracticum
    //   )
    //   .get(
    //     this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
    //     this.handler.getPracticums
    //   );

    return this.router;
  }
}
