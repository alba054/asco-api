import { constants } from "../..";
import { ScoreRecapEntity } from "../../../entity/score/ScoreRecapEntity";

interface IListScoreRecapDTO {
  student: {
    id: string;
    nickname: string;
    fullname: string;
    username: string;
    classOf: string;
    profilePic: string;
  };
  finalScore: number;
  assignmentScore: number;
  quizScore: number;
  responseScore: number;
  labExamScore: number;
  practicumId: string;
  assignmentScores?: {
    meetingName: string;
    meetingNumber: number;
    assignmentScore: number;
  }[];
  quizScores?: {
    meetingName: string;
    meetingNumber: number;
    quizScore: number;
  }[];
  responseScores?: {
    meetingName: string;
    meetingNumber: number;
    responseScore: number;
  }[];
}

export const ListScoreRecapDTO = (scoreRecap: ScoreRecapEntity) => {
  return {
    student: {
      id: scoreRecap.student?.id,
      user: { id: scoreRecap.student?.userId },
      fullname: scoreRecap.student?.fullname,
      username: scoreRecap.student?.username,
      nickname: scoreRecap.student?.nickname,
      classOf: scoreRecap.student?.classOf,
      profilePic: constants.GCS_OBJECT_BASE(scoreRecap.student?.profilePic),
    },
    assignmentScore: scoreRecap.assignmentScore,
    finalScore: scoreRecap.finalScore,
    labExamScore: scoreRecap.examScore,
    practicumId: scoreRecap.practicumId,
    quizScore: scoreRecap.quizScore,
    responseScore: scoreRecap.responseScore,
    assignmentScores: scoreRecap.assignmentScores,
    quizScores: scoreRecap.quizScores,
    responseScores: scoreRecap.responseScores,
  } as IListScoreRecapDTO;
};
