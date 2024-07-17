import { Request, Response, NextFunction } from "express";
import { ITokenPayload } from "../../utils/interfaces/ITokenPayload";
import { getTokenPayload } from "../../utils";
import { USER_ROLE } from "@prisma/client";
import { PracticumService } from "../../services/practicum/PracticumService";
import { ListPracticumDTO } from "../../utils/dto/practicum/IListPracticumDTO";
import { PracticumEntity } from "../../entity/practicum/PracticumEntity";

export class GetPracticumsMiddleware {
  private practicumService: PracticumService;

  constructor(practicumService: PracticumService) {
    this.practicumService = practicumService;

    this.getPracticumsByRole = this.getPracticumsByRole.bind(this);
  }

  async getPracticumsByRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { userRole, profileId } = getTokenPayload(res);

    try {
      let practicums: PracticumEntity[];

      if (userRole === USER_ROLE.ADMIN) {
        practicums = await this.practicumService.getPracticums();
      } else {
        practicums = await this.practicumService.getpracticumsByParticipants(
          profileId
        );
      }

      res.locals = practicums.map(ListPracticumDTO);
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
