import { NextFunction, Request, RequestHandler, Response } from "express";

export abstract class FileHandler {
  constructor() {
    this.postFile = this.postFile.bind(this);
    this.getFile = this.getFile.bind(this);
  }

  abstract getFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract postFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
