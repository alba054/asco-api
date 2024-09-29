import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { PracticumService } from "./PracticumService";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { IPostPracticumPayload } from "../../utils/interfaces/request/IPostPracticumPayload";
import { PracticumEntity } from "../../entity/practicum/PracticumEntity";
import { IPutPracticumPayload } from "../../utils/interfaces/request/IPutPracticumPayload";
import { UserRepository } from "../../repository/user/UserRepository";
import { USER_ROLE } from "@prisma/client";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { LabExamScoreEntity } from "../../entity/score/LabExamScoreEntity";

export class PracticumServiceImpl extends PracticumService {
  constructor(repository: {
    practicumRepository: PracticumRepository;
    userRepository: UserRepository;
  }) {
    super(repository);
  }

  async getLabExamScoreByPracticumId(
    practicumId: string
  ): Promise<LabExamScoreEntity[]> {
    const scores = await this.practicumRepository.getLabExamScoreByPracticumId(
      practicumId
    );

    if (!scores) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    return scores;
  }

  async removeAssistantFromClassroom(
    practicumId: string,
    username: string
  ): Promise<void> {
    const practicum = await this.practicumRepository.getPracticumById(
      practicumId
    );

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundError(
        ERRORCODE.USER_NOT_FOUND_ERROR,
        "user's not found"
      );
    }

    if (user?.role !== USER_ROLE.ASSISTANT) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "user is not assistant"
      );
    }

    await this.practicumRepository.removeAssistantFromPracticumById(
      practicumId,
      username
    );
  }

  async getpracticumsByParticipants(
    profileId: string
  ): Promise<PracticumEntity[]> {
    return await this.practicumRepository.getPracticumsByParticipantId(
      profileId
    );
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
        examInfo: payload.examInfo,
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
      examInfo: payload.examInfo,
    });

    return await this.practicumRepository.createPracticum(practicum);
  }
}
