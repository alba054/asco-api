import { ExamScoreEntity } from "../../entity/examScore/ExamScoreEntity";

export abstract class ExamScoreRepository {
  abstract insertNewScore(score: ExamScoreEntity): Promise<void>;

  abstract getScoreByMeetingIdAndStudentIdAndType(
    id: string,
    studentId: string
  ): Promise<ExamScoreEntity | null>;
}
