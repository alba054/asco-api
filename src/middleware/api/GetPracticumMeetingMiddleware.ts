import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../../utils/interfaces/ITokenPayload";
import { ERRORCODE, getTokenPayload } from "../../utils";
import { MeetingService } from "../../services/meeting/MeetingService";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";

export class GetPracticumMeetingsMiddleware {
  private meetingService: MeetingService;

  constructor(meetingService: MeetingService) {
    this.meetingService = meetingService;

    this.checkAuthorizeRole = this.checkAuthorizeRole.bind(this);
  }

  async checkAuthorizeRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { practicumId } = req.params;

    try {
      const isAuthorized = await this.meetingService.isUserAuthorizedByPracticumId(
        practicumId,
        tokenPayload.userRole,
        tokenPayload.username
      );

      if (!isAuthorized) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "you are not authorized to view practicum"
        );
      }

      // * authorized user to view practicum meetings using practicumId
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
