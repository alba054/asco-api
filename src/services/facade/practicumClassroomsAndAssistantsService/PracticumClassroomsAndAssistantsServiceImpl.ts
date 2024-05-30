import { USER_ROLE } from "@prisma/client";
import { NotFoundError } from "../../../Exceptions/http/NotFoundError";
import { PracticumClassroomsAndAssistantsRepository } from "../../../repository/facade/practicumClassroomsAndAssistantsRepository/PracticumClassroomsAndAssistantsRepository";
import { PracticumRepository } from "../../../repository/practicum/PracticumRepository";
import { UserRepository } from "../../../repository/user/UserRepository";
import { ERRORCODE } from "../../../utils";
import { IPostPracticumClassroomsAndAssistants } from "../../../utils/interfaces/request/IPostPracticumClassroomsAndAssistants";
import { PracticumClassroomsAndAssistantsService } from "./PracticumClassroomsAndAssistantsService";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";

export class PracticumClassroomsAndAssistantsServiceImpl extends PracticumClassroomsAndAssistantsService {
  constructor(repository: {
    practicumRepository: PracticumRepository;
    userRepository: UserRepository;
    practicumClassroomsAndAssistantsRepository: PracticumClassroomsAndAssistantsRepository;
  }) {
    super(repository);
  }

  async addClassroomsAndAsistantsPracticum(
    practicumId: string,
    payload: IPostPracticumClassroomsAndAssistants
  ): Promise<void> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    let isNotAssistant = false;

    for (let i = 0; i < payload.assistants.length; i++) {
      const user = await this.userRepository.getUserByUsername(
        payload.assistants[i]
      );

      if (!user) {
        throw new NotFoundError(
          ERRORCODE.USER_NOT_FOUND_ERROR,
          "user's not found"
        );
      }

      if (user.role !== USER_ROLE.ASSISTANT) {
        isNotAssistant = true;
      }
    }

    if (isNotAssistant) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "there is at least one username not assistant"
      );
    }

    await this.practicumClassroomsAndAssistantsRepository.addClassroomsAndAsistantsPracticum(
      practicumId,
      payload
    );
  }
}
