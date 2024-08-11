import { SCORE_TYPE } from "@prisma/client";
import { ScoreEntity } from "../../entity/score/ScoreEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPostMeetingScore } from "../../utils/interfaces/request/IPostMeetingResponseScore";
import { ScoreService } from "./ScoreService";
import { IPostPracticumExamScore } from "../../utils/interfaces/request/IPostPracticumExamScore";
import { ExamScoreEntity } from "../../entity/examScore/ExamScoreEntity";

export class ScoreServiceImpl extends ScoreService {
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
