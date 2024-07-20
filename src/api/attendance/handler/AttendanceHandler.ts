import { NextFunction, Request, Response } from "express";

export abstract class AttendanceHandler {
  constructor() {
    this.deleteAttendance = this.deleteAttendance.bind(this);
  }

  abstract deleteAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
