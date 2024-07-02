import { NextFunction, Request, Response } from "express";
import { ERRORCODE, getTokenPayload } from "../../utils";
import { ITokenPayload } from "../../utils/interfaces/ITokenPayload";
import { MeetingService } from "../../services/meeting/MeetingService";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";

export class GetMeetingMiddleware {
  private meetingService: MeetingService;

  constructor(meetingService: MeetingService) {
    this.meetingService = meetingService;

    this.checkAuthorizedRole = this.checkAuthorizedRole.bind(this);
  }

  async checkAuthorizedRole(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { id } = req.params;

    try {
      const isAuthorized =
        await this.meetingService.isUserAuthorizedByMeetingId(
          id,
          tokenPayload.userRole,
          tokenPayload.username
        );

      if (!isAuthorized) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "you are not authorized to view meeting"
        );
      }

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
