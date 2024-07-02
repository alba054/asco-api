import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { PracticumService } from "./PracticumService";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { IPostPracticumPayload } from "../../utils/interfaces/request/IPostPracticumPayload";
import { PracticumEntity } from "../../entity/practicum/PracticumEntity";
import { IPutPracticumPayload } from "../../utils/interfaces/request/IPutPracticumPayload";

export class PracticumServiceImpl extends PracticumService {
  constructor(repository: { practicumRepository: PracticumRepository }) {
    super(repository);
  }

  async deletePracticumById(practicumId: string): Promise<void> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    await this.practicumRepository.deletePracticumById(practicumId);
  }

  async updatePracticumById(
    practicumId: string,
    payload: IPutPracticumPayload
  ): Promise<string> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    const practicumEntity = new PracticumEntity(
      payload.course ?? practicum.course,
      {
        id: practicumId,
        badge: payload.badge,
        courseContract: payload.courseContract,
      }
    );

    return await this.practicumRepository.updatePracticumById(practicumEntity);
  }

  async getPracticumById(practicumId: string): Promise<PracticumEntity> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    return practicum;
  }

  async getPracticums(): Promise<PracticumEntity[]> {
    return await this.practicumRepository.getPracticums();
  }

  async addNewPracticum(payload: IPostPracticumPayload): Promise<string> {
    const practicum = new PracticumEntity(payload.course, {
      badge: payload.badge,
      courseContract: payload.courseContract,
    });

    return await this.practicumRepository.createPracticum(practicum);
  }
}
