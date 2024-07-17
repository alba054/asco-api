import { NextFunction, Request, Response } from "express";

export abstract class ControlCardHandler {
  constructor() {
    

    this.getControlCard = this.getControlCard.bind(this);
  }

  abstract getControlCard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
