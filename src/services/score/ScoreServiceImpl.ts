import { SCORE_TYPE } from "@prisma/client";
import { ScoreEntity } from "../../entity/score/ScoreEntity";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../utils";
import { IPostMeetingResponseScore } from "../../utils/interfaces/request/IPostMeetingResponseScore";
import { ScoreService } from "./ScoreService";

export class ScoreServiceImpl extends ScoreService {
  async addResponseScore(
    meetingId: string,
    payload: IPostMeetingResponseScore,
    assistantId: string
  ): Promise<void> {
    const meeting = await this.meetingRepository.getMeetingById(meetingId);

    if (!meeting) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "meeting's not found"
      );
    }

    const oldScore = await this.scoreRepository.getScoreByMeetingIdAndStudentId(
      meetingId,
      payload.studentId
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

    const score = new ScoreEntity(SCORE_TYPE.RESPONSE, payload.score, {
      classroomId: classroom.id,
      meetingId: meetingId,
      studentId: payload.studentId,
    });

    await this.scoreRepository.insertNewScore(score);
  }
}
