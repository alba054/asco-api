import { PracticumClassroomsAndAssistantsRepository } from "../../../repository/facade/practicumClassroomsAndAssistantsRepository/PracticumClassroomsAndAssistantsRepository";
import { PracticumRepository } from "../../../repository/practicum/PracticumRepository";
import { UserRepository } from "../../../repository/user/UserRepository";
import { IPostPracticumClassroomsAndAssistants } from "../../../utils/interfaces/request/IPostPracticumClassroomsAndAssistants";

export abstract class PracticumClassroomsAndAssistantsService {
  protected practicumClassroomsAndAssistantsRepository: PracticumClassroomsAndAssistantsRepository;
  protected practicumRepository: PracticumRepository;
  protected userRepository: UserRepository;

  constructor(repository: {
    practicumRepository: PracticumRepository;
    userRepository: UserRepository;
    practicumClassroomsAndAssistantsRepository: PracticumClassroomsAndAssistantsRepository;
  }) {
    this.practicumClassroomsAndAssistantsRepository =
      repository.practicumClassroomsAndAssistantsRepository;
    this.practicumRepository = repository.practicumRepository;
    this.userRepository = repository.userRepository;
  }

  abstract addClassroomsAndAsistantsPracticum(
    practicumId: string,
    payload: IPostPracticumClassroomsAndAssistants
  ): Promise<void>;
}
