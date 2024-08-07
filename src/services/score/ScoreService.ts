import { ClassRoomRepository } from "../../repository/classroom/ClassroomRepository";
import { MeetingRepository } from "../../repository/meeting/MeetingRepository";
import { ScoreRepository } from "../../repository/score/ScoreRepository";
import { IPostMeetingResponseScore } from "../../utils/interfaces/request/IPostMeetingResponseScore";

export abstract class ScoreService {
  protected scoreRepository: ScoreRepository;
  protected meetingRepository: MeetingRepository;
  protected classroomRepository: ClassRoomRepository;

  constructor(repository: {
    scoreRepository: ScoreRepository;
    meetingRepository: MeetingRepository;
    classroomRepository: ClassRoomRepository;
  }) {
    this.scoreRepository = repository.scoreRepository;
    this.meetingRepository = repository.meetingRepository;
    this.classroomRepository = repository.classroomRepository;
  }

  abstract addResponseScore(
    id: string,
    payload: IPostMeetingResponseScore,
    assistant: string
  ): Promise<void>;
}
