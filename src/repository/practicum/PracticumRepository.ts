import { PracticumEntity } from "../../entity/practicum/PracticumEntity";
import { LabExamScoreEntity } from "../../entity/score/LabExamScoreEntity";

export abstract class PracticumRepository {
  abstract getLabExamScoreByPracticumId(
    practicumId: string
  ): Promise<LabExamScoreEntity[]>;

  abstract removeAssistantFromPracticumById(
    practicumId: string,
    username: string
  ): Promise<void>;

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
