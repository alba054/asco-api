import { NextFunction, Request, Response } from "express";

export abstract class MeetingHandler {
  constructor() {
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.getMeeting = this.getMeeting.bind(this);
    this.putMeeting = this.putMeeting.bind(this);
  }

  abstract putMeeting(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getMeeting(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract deleteMeeting(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
