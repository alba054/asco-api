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
    this.deleteAssistantFromPracticum =
      this.deleteAssistantFromPracticum.bind(this);
    this.getPracticumMeetingAttendances =
      this.getPracticumMeetingAttendances.bind(this);
    this.postPracticumExamScore = this.postPracticumExamScore.bind(this);
    this.getScoreRecaps = this.getScoreRecaps.bind(this);
    this.getStudentScoreDetail = this.getStudentScoreDetail.bind(this);
    this.getStudentScoreDetailStudent =
      this.getStudentScoreDetailStudent.bind(this);
    this.getExamScore = this.getExamScore.bind(this);
  }

  abstract getExamScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getStudentScoreDetailStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getStudentScoreDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getScoreRecaps(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postPracticumExamScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getPracticumMeetingAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract deleteAssistantFromPracticum(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

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
