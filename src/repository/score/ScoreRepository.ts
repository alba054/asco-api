import { SCORE_TYPE } from "@prisma/client";
import { ScoreEntity } from "../../entity/score/ScoreEntity";

export abstract class ScoreRepository {
  abstract getScoreByMeetingIdAndStudentIdAndType(
    meetingId: string,
    studentId: string,
    type: SCORE_TYPE
  ): Promise<ScoreEntity | null>;
  abstract insertNewScore(score: ScoreEntity): Promise<void>;
}
