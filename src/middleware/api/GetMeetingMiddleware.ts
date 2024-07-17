import { NextFunction, Request, Response } from "express";
import { ERRORCODE, getTokenPayload } from "../../utils";
import { ITokenPayload } from "../../utils/interfaces/ITokenPayload";
import { MeetingService } from "../../services/meeting/MeetingService";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { USER_ROLE } from "@prisma/client";

export class GetMeetingMiddleware {
  private meetingService: MeetingService;

  constructor(meetingService: MeetingService) {
    this.meetingService = meetingService;

    this.checkAuthorizedRole = this.checkAuthorizedRole.bind(this);
  }

  async checkAuthorizedRole(req: Request, res: Response, next: NextFunction) {
    const { userRole, username } = getTokenPayload(res);
    const { id } = req.params;

    try {
      if (userRole === USER_ROLE.ADMIN) {
        return next();
      }

      const isAuthorized =
        await this.meetingService.isUserAuthorizedByMeetingId(
          id,
          userRole,
          username
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
