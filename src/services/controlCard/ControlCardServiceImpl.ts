import { ControlCardEntity } from "../../entity/controlCard/ControlCardEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { ControlCardService } from "./ControlCardService";

export class ControlCardServiceImpl extends ControlCardService {
  async getControlCardsByPracticumAndGroupMentor(
    practicumId: string,
    id: string,
    mentorId: string
  ): Promise<ControlCardEntity[]> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    // todo: check if this mentor is authorized to view this students cards
    /**
     * todo: code here
     */
    // todo

    return await this.controlCardRepository.getControlCardsByPracticumIdAndProfileId(
      practicumId,
      id
    );
  }

  async getControlCardById(
    cardId: string,
    profileId?: string
  ): Promise<ControlCardEntity> {
    const card = await this.controlCardRepository.getControlCardById(cardId);

    if (!card) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "card's not found");
    }

    if (profileId && card?.studentId !== profileId) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "you are not the author of the card"
      );
    }

    return card;
  }

  async getControlCardsByPracticumIdAndProfileId(
    practicumId: string,
    profileId: string
  ): Promise<ControlCardEntity[]> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    return await this.controlCardRepository.getControlCardsByPracticumIdAndProfileId(
      practicumId,
      profileId
    );
  }
}
