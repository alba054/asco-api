import { PracticumEntity } from "../../entity/practicum/PracticumEntity";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { IPostPracticumPayload } from "../../utils/interfaces/request/IPostPracticumPayload";
import { IPutPracticumPayload } from "../../utils/interfaces/request/IPutPracticumPayload";

export abstract class PracticumService {
  protected practicumRepository: PracticumRepository;

  constructor(repository: { practicumRepository: PracticumRepository }) {
    this.practicumRepository = repository.practicumRepository;
  }

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
