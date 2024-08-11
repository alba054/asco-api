import { ControlCardEntity } from "../../entity/controlCard/ControlCardEntity";

export abstract class ControlCardRepository {
  abstract getControlCardByMeetingIdAndAssistantId(
    meetingId: string,
    assitantId: string
  ): Promise<ControlCardEntity[]>;

  abstract getControlCardById(
    cardId: string
  ): Promise<ControlCardEntity | null>;

  abstract getControlCardsByPracticumIdAndProfileId(
    practicumId: string,
    profileId: string
  ): Promise<ControlCardEntity[]>;
}
