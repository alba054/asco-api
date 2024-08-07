// id          String     @id @default(uuid())
// classroom   Classroom  @relation(fields: [classroomId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// meeting     Meeting    @relation(fields: [meetingId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// student     Profile    @relation(fields: [profileId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// type        SCORE_TYPE
// score       Float      @default(0) @db.Double
// createdAt   DateTime   @default(now())
// updatedAt   DateTime   @default(now()) @updatedAt
// classroomId String
// meetingId   String
// profileId   String

import { SCORE_TYPE } from "@prisma/client";
import { ClassroomEntity } from "../classroom/ClassroomEntity";
import { MeetingEntity } from "../meeting/MeetingEntity";
import { ProfileEntity } from "../profile/ProfileEntitiy";

export class ScoreEntity {
  private _id?: string | undefined;
  private _classroomId?: string | undefined;
  private _classroom?: ClassroomEntity | undefined;
  private _meetingId?: string | undefined;
  private _meeting?: MeetingEntity | undefined;
  private _studentId?: string | undefined;
  private _student?: ProfileEntity | undefined;
  private _type: SCORE_TYPE;
  private _score: number;

  constructor(
    type: SCORE_TYPE,
    score: number,
    args?: {
      id?: string;
      classroomId?: string;
      classroom?: ClassroomEntity;
      meetingId?: string;
      meeting?: MeetingEntity;
      studentId?: string;
      student?: ProfileEntity;
    }
  ) {
    this._type = type;
    this._score = score;
    this.id = args?.id;
    this.classroomId = args?.classroomId;
    this.classroom = args?.classroom;
    this.meetingId = args?.meetingId;
    this.meeting = args?.meeting;
    this.studentId = args?.studentId;
    this.student = args?.student;
  }

  public get score(): number {
    return this._score;
  }
  public set score(value: number) {
    this._score = value;
  }

  public get type(): SCORE_TYPE {
    return this._type;
  }
  public set type(value: SCORE_TYPE) {
    this._type = value;
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

  public get meetingId(): string | undefined {
    return this._meetingId;
  }
  public set meetingId(value: string | undefined) {
    this._meetingId = value;
  }

  public get meeting(): MeetingEntity | undefined {
    return this._meeting;
  }
  public set meeting(value: MeetingEntity | undefined) {
    this._meeting = value;
  }

  public get classroom(): ClassroomEntity | undefined {
    return this._classroom;
  }
  public set classroom(value: ClassroomEntity | undefined) {
    this._classroom = value;
  }

  public get classroomId(): string | undefined {
    return this._classroomId;
  }
  public set classroomId(value: string | undefined) {
    this._classroomId = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
