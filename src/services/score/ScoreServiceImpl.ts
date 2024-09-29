import { SCORE_TYPE } from "@prisma/client";
import { ScoreEntity } from "../../entity/score/ScoreEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPostMeetingScore } from "../../utils/interfaces/request/IPostMeetingResponseScore";
import { ScoreService } from "./ScoreService";
import { IPostPracticumExamScore } from "../../utils/interfaces/request/IPostPracticumExamScore";
import { ExamScoreEntity } from "../../entity/examScore/ExamScoreEntity";
import { ScoreRecapEntity } from "../../entity/score/ScoreRecapEntity";
import { IPutPracticumExamScore } from "../../utils/interfaces/request/IPutPracticumScore";

export class ScoreServiceImpl extends ScoreService {
  async updateExamScoreById(
    id: string,
    payload: IPutPracticumExamScore
  ): Promise<void> {
    const score = await this.examScoreRepository.getExamScoreById(id);

    if (!score) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "score's not found");
    }

    const scoreEntity = new ExamScoreEntity(payload.score, {
      id,
    });

    await this.examScoreRepository.updateExamScoreById(scoreEntity);
  }

  async updateScoreById(
    id: string,
    payload: IPutPracticumExamScore
  ): Promise<void> {
    const score = await this.scoreRepository.getScoreById(id);

    if (!score) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "score's not found");
    }

    const scoreEntity = new ExamScoreEntity(payload.score, {
      id,
    });

    await this.scoreRepository.updateScoreById(scoreEntity);
  }

  async getScoreRecapByPracticumIdAndStudentId(
    practicumId: string,
    studentId: string
  ): Promise<ScoreRecapEntity> {
    const recap =
      await this.scoreRepository.getRecapScoreByPracticumIdAndStudentId(
        practicumId,
        studentId
      );

    if (!recap) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "user's not found");
    }

    return recap;
  }

  async getScoreRecapByPracticumId(
    practicumId: string
  ): Promise<ScoreRecapEntity[]> {
    const recaps = await this.scoreRepository.getRecapScoreByPracticumId(
      practicumId
    );

    return recaps;
  }

  async addPracticumExamScore(
    id: string,
    payload: IPostPracticumExamScore,
    profileId: string
  ): Promise<void> {
    const practicum = await this.practicumRepository.getPracticumById(id);

    if (!practicum) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "practicum's not found"
      );
    }

    const oldScore =
      await this.examScoreRepository.getScoreByMeetingIdAndStudentIdAndType(
        id,
        payload.studentId
      );

    if (oldScore) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "this student has been scored"
      );
    }

    if (!practicum?.participants.map((p) => p.id).includes(profileId)) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "assistant's not in practicum participants"
      );
    }

    if (!practicum?.participants.map((p) => p.id).includes(payload.studentId)) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "student's not in practicum participants"
      );
    }

    const score = new ExamScoreEntity(payload.score, {
      studentId: payload.studentId,
      practicumId: id,
    });

    await this.examScoreRepository.insertNewScore(score);
  }

  async addResponseScore(
    meetingId: string,
    payload: IPostMeetingScore,
    assistantId: string
  ): Promise<void> {
    const meeting = await this.meetingRepository.getMeetingById(meetingId);

    if (!meeting) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "meeting's not found"
      );
    }

    const oldScore =
      await this.scoreRepository.getScoreByMeetingIdAndStudentIdAndType(
        meetingId,
        payload.studentId,
        payload.type
      );

    if (oldScore) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "this student has been scored"
      );
    }

    if (
      !meeting.practicum?.participants.map((p) => p.id).includes(assistantId)
    ) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "assistant's not in practicum participants"
      );
    }

    if (
      !meeting.practicum?.participants
        .map((p) => p.id)
        .includes(payload.studentId)
    ) {
      throw new BadRequestError(
        ERRORCODE.BAD_REQUEST_ERROR,
        "student's not in practicum participants"
      );
    }

    const classroom =
      await this.classroomRepository.getClassroomByStudentIdAndPracticumId(
        payload.studentId,
        meeting.practicum.id!
      );

    if (!classroom) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "student's classroom is not found"
      );
    }

    const score = new ScoreEntity(payload.type, payload.score, {
      classroomId: classroom.id,
      meetingId: meetingId,
      studentId: payload.studentId,
    });

    await this.scoreRepository.insertNewScore(score);
  }
}
