import { ControlCardEntity } from "../../entity/controlCard/ControlCardEntity";
import { ControlCardRepository } from "../../repository/controlCard/ControlCardRepository";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";

export abstract class ControlCardService {
  protected practicumRepository: PracticumRepository;
  protected controlCardRepository: ControlCardRepository;

  constructor(repository: {
    practicumRepository: PracticumRepository;
    controlCardRepository: ControlCardRepository;
  }) {
    this.practicumRepository = repository.practicumRepository;
    this.controlCardRepository = repository.controlCardRepository;
  }

  abstract getControlCardsByPracticumAndGroupMentor(
    practicumId: string,
    id: string,
    profileId: string
  ): Promise<ControlCardEntity[]>;

  abstract getControlCardById(
    cardId: string,
    profileId?: string
  ): Promise<ControlCardEntity>;

  abstract getControlCardsByPracticumIdAndProfileId(
    practicumId: string,
    profileId: string
  ): Promise<ControlCardEntity[]>;
}
