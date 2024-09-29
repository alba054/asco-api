import { NextFunction, Request, Response } from "express";

export abstract class MeetingHandler {
  constructor() {
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.getMeeting = this.getMeeting.bind(this);
    this.putMeeting = this.putMeeting.bind(this);
    this.postMeetingAttendance = this.postMeetingAttendance.bind(this);
    this.getMeetingAttendances = this.getMeetingAttendances.bind(this);
    this.postMeetingAttendances = this.postMeetingAttendances.bind(this);
    this.postMeetingScore = this.postMeetingScore.bind(this);
    this.getMeetingControlCards = this.getMeetingControlCards.bind(this);
    this.getStudentMeetingScores = this.getStudentMeetingScores.bind(this);
    this.putMeetingAttendance = this.putMeetingAttendance.bind(this);
  }

  abstract putMeetingAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getStudentMeetingScores(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getMeetingControlCards(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postMeetingScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

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
