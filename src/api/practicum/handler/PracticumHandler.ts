import { NextFunction, Request, Response } from "express";

export abstract class PracticumHandler {
  constructor() {
    this.postPracticum = this.postPracticum.bind(this);
    this.getPracticums = this.getPracticums.bind(this);
    this.getPracticum = this.getPracticum.bind(this);
    this.putPracticum = this.putPracticum.bind(this);
    this.deletePracticum = this.deletePracticum.bind(this);
    this.postAssitantsAndClassrooms =
      this.postAssitantsAndClassrooms.bind(this);
    this.postMeetingToPracticum = this.postMeetingToPracticum.bind(this);
    this.getPracticumMeetings = this.getPracticumMeetings.bind(this);
    this.postPracticumAssistanceGroups =
      this.postPracticumAssistanceGroups.bind(this);
    this.getPracticumAssistanceGroups =
      this.getPracticumAssistanceGroups.bind(this);
    this.getPracticumControlCards = this.getPracticumControlCards.bind(this);
    this.getStudentPracticumControlCards =
      this.getStudentPracticumControlCards.bind(this);
    this.getPracticumAttendances = this.getPracticumAttendances.bind(this);
    this.getStudentPracticumAttendances =
      this.getStudentPracticumAttendances.bind(this);
  }

  abstract getStudentPracticumAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getPracticumAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getStudentPracticumControlCards(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getPracticumControlCards(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getPracticumAssistanceGroups(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postPracticumAssistanceGroups(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getPracticumMeetings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postMeetingToPracticum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postAssitantsAndClassrooms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract deletePracticum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract putPracticum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getPracticum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getPracticums(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postPracticum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
