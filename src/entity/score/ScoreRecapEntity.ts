import { ProfileEntity } from "../profile/ProfileEntitiy";

export class ScoreRecapEntity {
  private _practicumId?: string | undefined;
  private _assignmentScore?: number | undefined;
  private _quizScore?: number | undefined;
  private _responseScore?: number | undefined;
  private _examScore?: number | undefined;
  private _student?: ProfileEntity | undefined;
  private _finalScore?: number | undefined;
  private _assignmentScores?:
    | {
        meetingName: string;
        meetingNumber: number;
        assignmentScore: number;
      }[]
    | undefined;
  public get assignmentScores():
    | {
        meetingName: string;
        meetingNumber: number;
        assignmentScore: number;
      }[]
    | undefined {
    return this._assignmentScores;
  }
  public set assignmentScores(
    value:
      | {
          meetingName: string;
          meetingNumber: number;
          assignmentScore: number;
        }[]
      | undefined
  ) {
    this._assignmentScores = value;
  }
  private _quizScores?:
    | {
        meetingName: string;
        meetingNumber: number;
        quizScore: number;
      }[]
    | undefined;
  public get quizScores():
    | {
        meetingName: string;
        meetingNumber: number;
        quizScore: number;
      }[]
    | undefined {
    return this._quizScores;
  }
  public set quizScores(
    value:
      | {
          meetingName: string;
          meetingNumber: number;
          quizScore: number;
        }[]
      | undefined
  ) {
    this._quizScores = value;
  }
  private _responseScores?:
    | {
        meetingName: string;
        meetingNumber: number;
        responseScore: number;
      }[]
    | undefined;
  public get responseScores():
    | {
        meetingName: string;
        meetingNumber: number;
        responseScore: number;
      }[]
    | undefined {
    return this._responseScores;
  }
  public set responseScores(
    value:
      | {
          meetingName: string;
          meetingNumber: number;
          responseScore: number;
        }[]
      | undefined
  ) {
    this._responseScores = value;
  }

  constructor(
    practicumId: string,
    assignmentScore: number,
    quizScore: number,
    responseScore: number,
    examScore: number,
    student: ProfileEntity,
    args?: {
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
  ) {
    this.practicumId = practicumId;
    this.assignmentScore = assignmentScore;
    this.quizScore = quizScore;
    this.responseScore = responseScore;
    this.examScore = examScore;
    this.student = student;
    this.assignmentScores = args?.assignmentScores;
    this.quizScores = args?.quizScores;
    this.responseScores = args?.responseScores;
    this.calculateFinalScore();
  }

  private calculateFinalScore() {
    this.finalScore =
      ((this.assignmentScore ?? 0) +
        (this.quizScore ?? 0) +
        (this.responseScore ?? 0) +
        (this.examScore ?? 0)) /
      4;
  }

  public get examScore(): number | undefined {
    return this._examScore;
  }
  public set examScore(value: number | undefined) {
    this._examScore = value;
  }

  public get finalScore(): number | undefined {
    return this._finalScore;
  }
  public set finalScore(value: number | undefined) {
    this._finalScore = value;
  }

  public get student(): ProfileEntity | undefined {
    return this._student;
  }
  public set student(value: ProfileEntity | undefined) {
    this._student = value;
  }

  public get responseScore(): number | undefined {
    return this._responseScore;
  }
  public set responseScore(value: number | undefined) {
    this._responseScore = value;
  }

  public get quizScore(): number | undefined {
    return this._quizScore;
  }
  public set quizScore(value: number | undefined) {
    this._quizScore = value;
  }

  public get assignmentScore(): number | undefined {
    return this._assignmentScore;
  }
  public set assignmentScore(value: number | undefined) {
    this._assignmentScore = value;
  }

  public get practicumId(): string | undefined {
    return this._practicumId;
  }
  public set practicumId(value: string | undefined) {
    this._practicumId = value;
  }
}
