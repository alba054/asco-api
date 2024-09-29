import { ExamScoreEntity } from "../../entity/examScore/ExamScoreEntity";

export abstract class ExamScoreRepository {
  abstract getExamScoreById(id: string): Promise<ExamScoreEntity | null>;
  abstract updateExamScoreById(scoreEntity: ExamScoreEntity): Promise<void>;
  abstract insertNewScore(score: ExamScoreEntity): Promise<void>;

  abstract getScoreByMeetingIdAndStudentIdAndType(
    id: string,
    studentId: string
  ): Promise<ExamScoreEntity | null>;
}
