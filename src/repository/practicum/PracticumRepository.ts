import { PracticumEntity } from "../../entity/practicum/PracticumEntity";

export abstract class PracticumRepository {
  abstract getPracticumsByParticipantId(
    profileId: string
  ): Promise<PracticumEntity[]>;

  abstract deletePracticumById(practicumId: string): Promise<void>;

  abstract updatePracticumById(
    practicumEntity: PracticumEntity
  ): Promise<string>;

  abstract getPracticumById(
    practicumId: string
  ): Promise<PracticumEntity | null>;

  abstract getPracticums(): Promise<PracticumEntity[]>;
  abstract createPracticum(practicum: PracticumEntity): Promise<string>;
}
