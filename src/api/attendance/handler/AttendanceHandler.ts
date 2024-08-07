import { NextFunction, Request, Response } from "express";

export abstract class AttendanceHandler {
  constructor() {
    this.deleteAttendance = this.deleteAttendance.bind(this);
    this.putAttendance = this.putAttendance.bind(this);
    this.getAttendance = this.getAttendance.bind(this);
  }

  abstract getAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract putAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;

  abstract deleteAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
