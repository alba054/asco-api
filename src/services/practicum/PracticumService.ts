import { PracticumEntity } from "../../entity/practicum/PracticumEntity";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { UserRepository } from "../../repository/user/UserRepository";
import { IPostPracticumPayload } from "../../utils/interfaces/request/IPostPracticumPayload";
import { IPutPracticumPayload } from "../../utils/interfaces/request/IPutPracticumPayload";

export abstract class PracticumService {
  protected practicumRepository: PracticumRepository;
  protected userRepository: UserRepository;

  constructor(repository: {
    practicumRepository: PracticumRepository;
    userRepository: UserRepository;
  }) {
    this.practicumRepository = repository.practicumRepository;
    this.userRepository = repository.userRepository;
  }

  abstract removeAssistantFromClassroom(
    practicumId: string,
    username: string
  ): Promise<void>;

  abstract getpracticumsByParticipants(
    profileId: string
  ): Promise<PracticumEntity[]>;

  abstract deletePracticumById(practicumId: string): Promise<void>;

  abstract updatePracticumById(
    practicumId: string,
    payload: IPutPracticumPayload
  ): Promise<string>;

  abstract getPracticumById(practicumId: string): Promise<PracticumEntity>;

  abstract getPracticums(): Promise<PracticumEntity[]>;

  abstract addNewPracticum(payload: IPostPracticumPayload): Promise<string>;
}
