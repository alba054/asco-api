import { ControlCardEntity } from "../../entity/controlCard/ControlCardEntity";
import { ControlCardRepository } from "../../repository/controlCard/ControlCardRepository";
import { MeetingRepository } from "../../repository/meeting/MeetingRepository";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";

export abstract class ControlCardService {
  protected practicumRepository: PracticumRepository;
  protected controlCardRepository: ControlCardRepository;
  protected meetingRepository: MeetingRepository;

  constructor(repository: {
    practicumRepository: PracticumRepository;
    controlCardRepository: ControlCardRepository;
    meetingRepository: MeetingRepository;
  }) {
    this.practicumRepository = repository.practicumRepository;
    this.controlCardRepository = repository.controlCardRepository;
    this.meetingRepository = repository.meetingRepository;
  }

  abstract getControlCardByMeetingIdAndAssistantId(
    id: string,
    profileId: string
  ): Promise<ControlCardEntity[]>;

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
