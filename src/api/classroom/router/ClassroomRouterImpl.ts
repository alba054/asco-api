import { Router } from "express";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";
import { BaseRouter } from "../../base/Router";
import { USER_ROLE } from "@prisma/client";
import { ClassRoomHandler } from "../handler/ClassroomHandler";

export class ClassroomRouter extends BaseRouter {
  private authorizationMiddlware: AuthorizationBearer;
  private handler: ClassRoomHandler;

  constructor(
    handler: ClassRoomHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/classes");
    this.handler = handler;
    this.authorizationMiddlware = authorizationMiddleware;
  }

  register(): Router {
    // * get classrooms for students
    this.router
      .route(this.path)
      .get(
        this.authorizationMiddlware.authorize([USER_ROLE.STUDENT]),
        this.handler.getStudentClassrooms
      );

    // * get classroom detail
    this.router
      .route(this.path + "/:classroomId")
      .get(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.getClassroom
      )
      .delete(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.deleteClassroom
      );

    // * get classroom meetings
    this.router
      .route(this.path + "/:classroomId/meetings")
      .get(
        this.authorizationMiddlware.authorize([USER_ROLE.STUDENT]),
        this.handler.getClassroomMeetings
      );

    // * assign students to classrooms
    this.router
      .route(this.path + "/:classroomId/students")
      .put(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.putStudentToClassroom
      );

    // * remove student from classroom
    this.router
      .route(this.path + "/:classroomId/students/:username")
      .delete(
        this.authorizationMiddlware.authorize([USER_ROLE.ADMIN]),
        this.handler.deleteStudentFromClassroom
      );

    return this.router;
  }
}
