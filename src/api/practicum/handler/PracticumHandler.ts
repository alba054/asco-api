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
  }

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
