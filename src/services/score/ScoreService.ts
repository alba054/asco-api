import { ClassRoomRepository } from "../../repository/classroom/ClassroomRepository";
import { ExamScoreRepository } from "../../repository/examScore/ExamScoreRepository";
import { MeetingRepository } from "../../repository/meeting/MeetingRepository";
import { PracticumRepository } from "../../repository/practicum/PracticumRepository";
import { ScoreRepository } from "../../repository/score/ScoreRepository";
import { IPostMeetingScore } from "../../utils/interfaces/request/IPostMeetingResponseScore";
import { IPostPracticumExamScore } from "../../utils/interfaces/request/IPostPracticumExamScore";

export abstract class ScoreService {
  protected scoreRepository: ScoreRepository;
  protected meetingRepository: MeetingRepository;
  protected classroomRepository: ClassRoomRepository;
  protected practicumRepository: PracticumRepository;
  protected examScoreRepository: ExamScoreRepository;

  constructor(repository: {
    scoreRepository: ScoreRepository;
    meetingRepository: MeetingRepository;
    classroomRepository: ClassRoomRepository;
    practicumRepository: PracticumRepository;
    examScoreRepository: ExamScoreRepository;
  }) {
    this.scoreRepository = repository.scoreRepository;
    this.meetingRepository = repository.meetingRepository;
    this.classroomRepository = repository.classroomRepository;
    this.practicumRepository = repository.practicumRepository;
    this.examScoreRepository = repository.examScoreRepository;
  }

  abstract addPracticumExamScore(
    id: string,
    payload: IPostPracticumExamScore,
    profileId: string
  ): Promise<void>;

  abstract addResponseScore(
    id: string,
    payload: IPostMeetingScore,
    assistant: string
  ): Promise<void>;
}
