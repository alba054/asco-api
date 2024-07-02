import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../../utils/interfaces/ITokenPayload";
import { ERRORCODE, getTokenPayload } from "../../utils";
import { MeetingService } from "../../services/meeting/MeetingService";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { AssistanceGroupService } from "../../services/assistanceGroup/AssistanceGroupService";
import { USER_ROLE } from "@prisma/client";
import { ListGroupDTO } from "../../utils/dto/assistanceGroup/IListGroupDTO";
import { GroupDTO } from "../../utils/dto/assistanceGroup/IGroupDTO";
import { StudentGroupDTO } from "../../utils/dto/assistanceGroup/IStudentGroupDTO";

export class GetPracticumAssistanceGroupMiddleware {
  private assistanceGroupService: AssistanceGroupService;

  constructor(assistanceGroupService: AssistanceGroupService) {
    this.assistanceGroupService = assistanceGroupService;

    this.getPracticumAssistanceGroups =
      this.getPracticumAssistanceGroups.bind(this);
  }

  async getPracticumAssistanceGroups(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const tokenPayload: ITokenPayload = getTokenPayload(res);
    const { practicumId } = req.params;

    try {
      if (tokenPayload.userRole === USER_ROLE.ADMIN) {
        const groups = await this.assistanceGroupService.getGroupsByPracticumId(
          practicumId
        );

        res.locals = groups.map(ListGroupDTO);
      } else {
        const groups =
          await this.assistanceGroupService.getGroupsByPracticumIdAndUsername(
            practicumId,
            tokenPayload.username
          );

        if (tokenPayload.userRole === USER_ROLE.STUDENT) {
          res.locals = StudentGroupDTO(groups.at(0) ?? null);
        } else {
          res.locals = groups.map(ListGroupDTO);
        }
      }

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
