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

import { ClassroomEntity } from "../classroom/ClassroomEntity";
import { MeetingEntity } from "../meeting/MeetingEntity";
import { ProfileEntity } from "../profile/ProfileEntitiy";

export class PracticumEntity {
  private _classroomsLength?: number | undefined;
  private _meetingsLength?: number | undefined;
  private _id?: string | undefined;
  private _course: string;
  private _badge?: string | undefined;
  private _courseContract?: string | undefined;
  private _participants: ProfileEntity[];
  private _classrooms: ClassroomEntity[];
  private _meetings: MeetingEntity[];
  private _examInfo?: string | undefined;

  constructor(
    course: string,
    args?: {
      id?: string;
      badge?: string;
      courseContract?: string;
      participants?: ProfileEntity[];
      classroomsLength?: number;
      meetingsLength?: number;
      classrooms?: ClassroomEntity[];
      meetings?: MeetingEntity[];
      examInfo?: string;
    }
  ) {
    this._course = course;
    this.id = args?.id;
    this.badge = args?.badge;
    this.courseContract = args?.courseContract;
    this._participants = args?.participants ?? [];
    this.classroomsLength = args?.classroomsLength;
    this._classrooms = args?.classrooms ?? [];
    this._meetings = args?.meetings ?? [];
    this.examInfo = args?.examInfo;
    this.meetingsLength = args?.meetingsLength;
  }

  public get examInfo(): string | undefined {
    return this._examInfo;
  }
  public set examInfo(value: string | undefined) {
    this._examInfo = value;
  }

  public get meetingsLength(): number | undefined {
    return this._meetingsLength;
  }
  public set meetingsLength(value: number | undefined) {
    this._meetingsLength = value;
  }

  public get meetings(): MeetingEntity[] {
    return this._meetings;
  }

  public set meetings(value: MeetingEntity[]) {
    this._meetings = value;
  }

  public get classrooms(): ClassroomEntity[] {
    return this._classrooms;
  }
  public set classrooms(value: ClassroomEntity[]) {
    this._classrooms = value;
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
