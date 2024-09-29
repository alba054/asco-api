import { Router } from "express";
import { UserHandler } from "../handler/UserHandler";
import { BasicAuthMiddleware } from "../../../middleware/auth/BasicAuth";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";

export class UserRouterImpl extends BaseRouter {
  private basicAuthMiddleware: BasicAuthMiddleware;
  private authorizationMiddlware: AuthorizationBearer;
  private handler: UserHandler;

  constructor(
    handler: UserHandler,
    basicAuthMiddleware: BasicAuthMiddleware,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/users");
    this.handler = handler;
    this.basicAuthMiddleware = basicAuthMiddleware;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // * create student/assistant
    // * get user staff credential
    this.router
      .route(this.path)
      .post(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.postUser
      )
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
          USER_ROLE.STUDENT,
        ]),
        this.handler.getUserCredential
      ).put(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.putUserSelf
      );

    // * user login
    this.router
      .route(this.path + "/login")
      .post(
        this.basicAuthMiddleware.authenticate(),
        this.handler.postUserLogin
      );

    // * get users by admin
    this.router
      .route(this.path + "/master")
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
          USER_ROLE.STUDENT,
        ]),
        this.handler.getUsersMaster
      );

    // * get user's schedules
    this.router
      .route(this.path + "/meetings")
      .get(
        this.authorizationMiddlware.authorize([USER_ROLE.ASSISTANT]),
        this.handler.getUserMeetings
      );

    // * delete user by admin using userId
    this.router
      .route(this.path + "/:username")
      .delete(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.deleteUser
      )
      .put(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.putUser
      )
      .get(
        this.authorizationMiddlware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
        ]),
        this.handler.getUserInfo
      );

    return this.router;
  }
}
