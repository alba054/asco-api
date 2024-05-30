import { IPostPracticumClassroomsAndAssistants } from "../../../utils/interfaces/request/IPostPracticumClassroomsAndAssistants";

export abstract class PracticumClassroomsAndAssistantsRepository {
  abstract addClassroomsAndAsistantsPracticum(
    practicumId: string,
    payload: IPostPracticumClassroomsAndAssistants
  ): Promise<void>;
}
