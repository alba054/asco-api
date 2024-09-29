import { SCORE_TYPE } from "@prisma/client";
import { ScoreEntity } from "../../entity/score/ScoreEntity";
import { ScoreRecapEntity } from "../../entity/score/ScoreRecapEntity";
import { ExamScoreEntity } from "../../entity/examScore/ExamScoreEntity";

export abstract class ScoreRepository {
  abstract getScoreById(id: string): Promise<ScoreEntity | null>;
  abstract updateScoreById(scoreEntity: ExamScoreEntity): Promise<void>;
  abstract getRecapScoreByPracticumIdAndStudentId(
    practicumId: string,
    profileId: any
  ): Promise<ScoreRecapEntity | null>;

  abstract getRecapScoreByPracticumId(
    practicumId: string
  ): Promise<ScoreRecapEntity[]>;
  abstract getScoreByMeetingIdAndStudentIdAndType(
    meetingId: string,
    studentId: string,
    type: SCORE_TYPE
  ): Promise<ScoreEntity | null>;
  abstract insertNewScore(score: ScoreEntity): Promise<void>;
}
