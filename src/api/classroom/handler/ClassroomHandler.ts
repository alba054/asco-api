import { NextFunction, Request, Response } from "express";

export abstract class ClassRoomHandler {
  constructor() {
    this.putStudentToClassroom = this.putStudentToClassroom.bind(this);
    this.deleteStudentFromClassroom =
      this.deleteStudentFromClassroom.bind(this);
    this.getClassroom = this.getClassroom.bind(this);
    this.getStudentClassrooms = this.getStudentClassrooms.bind(this);
    this.getClassroomMeetings = this.getClassroomMeetings.bind(this);
    this.getStudentClassroomAssistanceGroup =
      this.getStudentClassroomAssistanceGroup.bind(this);
    this.deleteClassroom = this.deleteClassroom.bind(this);
  }

  abstract deleteClassroom(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getStudentClassroomAssistanceGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getClassroomMeetings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getStudentClassrooms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getClassroom(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract deleteStudentFromClassroom(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract putStudentToClassroom(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
