import { ProfileEntity } from "../profile/ProfileEntitiy";
import { PracticumEntity } from "../practicum/PracticumEntity";

export class ExamScoreEntity {
  private _id?: string | undefined;
  private _studentId?: string | undefined;
  private _student?: ProfileEntity | undefined;
  private _practicumId?: string | undefined;
  private _practicum?: PracticumEntity | undefined;
  private _score: number;

  constructor(
    score: number,
    args?: {
      id?: string;
      studentId?: string;
      student?: ProfileEntity;
      practicumId?: string;
      practicum?: PracticumEntity;
    }
  ) {
    this._score = score;
    this.id = args?.id;
    this.studentId = args?.studentId;
    this.student = args?.student;
    this.practicumId = args?.practicumId;
    this.practicum = args?.practicum;
  }

  public get practicum(): PracticumEntity | undefined {
    return this._practicum;
  }
  public set practicum(value: PracticumEntity | undefined) {
    this._practicum = value;
  }

  public get practicumId(): string | undefined {
    return this._practicumId;
  }
  public set practicumId(value: string | undefined) {
    this._practicumId = value;
  }

  public get score(): number {
    return this._score;
  }
  public set score(value: number) {
    this._score = value;
  }

  public get student(): ProfileEntity | undefined {
    return this._student;
  }
  public set student(value: ProfileEntity | undefined) {
    this._student = value;
  }

  public get studentId(): string | undefined {
    return this._studentId;
  }
  public set studentId(value: string | undefined) {
    this._studentId = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
