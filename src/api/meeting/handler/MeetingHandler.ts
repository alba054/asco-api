import { NextFunction, Request, Response } from "express";

export abstract class MeetingHandler {
  constructor() {
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.getMeeting = this.getMeeting.bind(this);
    this.putMeeting = this.putMeeting.bind(this);
    this.postMeetingAttendance = this.postMeetingAttendance.bind(this);
    this.getMeetingAttendances = this.getMeetingAttendances.bind(this);
    this.postMeetingAttendances = this.postMeetingAttendances.bind(this);
  }

  abstract postMeetingAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getMeetingAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postMeetingAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

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
