// id              String           @id @default(uuid())
//   course          String           @unique @db.VarChar(255)
//   badge           String?          @db.VarChar(255)
//   courseContract  String?          @db.VarChar(255)
//   participants    Profile[]
//   profileId       String?
//   createdAt       DateTime         @default(now())
//   updatedAt       DateTime         @default(now()) @updatedAt
//   classrooms      Classroom[]
//   meetings        Meeting[]
//   assistantGroups AssistantGroup[]
//   LabExamScore    LabExamScore[]

import { ProfileEntity } from "../profile/ProfileEntitiy";

export class PracticumEntity {
  private _classroomsLength?: number | undefined;
  private _id?: string | undefined;
  private _course: string;
  private _badge?: string | undefined;
  private _courseContract?: string | undefined;
  private _participants: ProfileEntity[];

  constructor(
    course: string,
    args?: {
      id?: string;
      badge?: string;
      courseContract?: string;
      participants?: ProfileEntity[];
      classroomsLength?: number;
    }
  ) {
    this._course = course;
    this.id = args?.id;
    this.badge = args?.badge;
    this.courseContract = args?.courseContract;
    this._participants = args?.participants ?? [];
    this.classroomsLength = args?.classroomsLength;
  }

  public get classroomsLength(): number | undefined {
    return this._classroomsLength;
  }
  public set classroomsLength(value: number | undefined) {
    this._classroomsLength = value;
  }

  public get participants(): ProfileEntity[] {
    return this._participants;
  }
  public set participants(value: ProfileEntity[]) {
    this._participants = value;
  }

  public get courseContract(): string | undefined {
    return this._courseContract;
  }
  public set courseContract(value: string | undefined) {
    this._courseContract = value;
  }

  public get badge(): string | undefined {
    return this._badge;
  }
  public set badge(value: string | undefined) {
    this._badge = value;
  }

  public get course(): string {
    return this._course;
  }
  public set course(value: string) {
    this._course = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
