import { NextFunction, Request, Response } from "express";

export abstract class AssistanceGroupHandler {
  constructor() {
    this.deleteAssistanceGroup = this.deleteAssistanceGroup.bind(this);
    this.getAssistanceGroup = this.getAssistanceGroup.bind(this);
    this.putAssistanceGroup = this.putAssistanceGroup.bind(this);
    this.deleteStudentFromAssistantGroup =
      this.deleteStudentFromAssistantGroup.bind(this);
  }

  abstract deleteStudentFromAssistantGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract putAssistanceGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract getAssistanceGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract deleteAssistanceGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
