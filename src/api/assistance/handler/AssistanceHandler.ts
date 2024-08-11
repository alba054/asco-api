import { NextFunction, Request, Response } from "express";

export abstract class AssistanceHandler {
  constructor() {
    this.getAssistance = this.getAssistance.bind(this);
    this.putAssistance = this.putAssistance.bind(this);
  }

  abstract putAssistance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getAssistance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
