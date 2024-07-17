import { Router } from "express";
import { BaseRouter } from "../../base/Router";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { FileHandler } from "../handler/FileHandler";
import { multerHelper } from "../../../utils/storage/MulterHelper";
import { USER_ROLE } from "@prisma/client";
import { multerBufferHelper } from "../../../utils/storage/MulterBufferHelper";

export class FileRouterImpl extends BaseRouter {
  private handler: FileHandler;
  private authorizationMiddleware: AuthorizationBearer;

  constructor(
    handler: FileHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/files");
    this.handler = handler;
    this.authorizationMiddleware = authorizationMiddleware;
  }

  register(): Router {
    // * upload file
    this.router
      .route(this.path)
      .post(
        this.authorizationMiddleware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
          USER_ROLE.STUDENT,
        ]),
        multerBufferHelper.upload.single("file"),
        this.handler.postFile
      )
      .get(
        this.authorizationMiddleware.authorize([
          USER_ROLE.ADMIN,
          USER_ROLE.ASSISTANT,
          USER_ROLE.STUDENT,
        ]),
        this.handler.getFile
      );

    return this.router;
  }
}
