import { ScoreEntity } from "../../entity/score/ScoreEntity";

export abstract class ScoreRepository {
  abstract getScoreByMeetingIdAndStudentId(
    meetingId: string,
    studentId: string
  ): Promise<ScoreEntity | null>;
  abstract insertNewScore(score: ScoreEntity): Promise<void>;
}
