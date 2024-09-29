import { NextFunction, Request, Response } from "express";

export abstract class ScoreHandler {
  constructor() {
    this.putScore = this.putScore.bind(this);
    this.putExamScore = this.putExamScore.bind(this);
  }

  abstract putExamScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract putScore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
