// id          String       @id @default(uuid())
//   name        String       @db.VarChar(3)
//   meetingDay  DAY
//   startTime   Int          @db.UnsignedSmallInt
//   endTime     Int          @db.UnsignedSmallInt
//   practicum   Practicum    @relation(fields: [practicumId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   students    Profile[]
//   createdAt   DateTime     @default(now())
//   updatedAt   DateTime     @default(now()) @updatedAt
//   practicumId String
//   attendances Attendance[]
//   scores      Score[]

import { DAY } from "@prisma/client";
import { PracticumEntity } from "../practicum/PracticumEntity";
import { ProfileEntity } from "../profile/ProfileEntitiy";

export class ClassroomEntity {
  private _id?: string | undefined;
  private _name: string;
  private _meetingDay: DAY;
  private _startTime: number;
  private _endTime: number;
  private _practicum?: PracticumEntity | undefined;
  private _practicumId?: string | undefined;
  private _students: ProfileEntity[];
  private _studentsCount?: number | undefined;

  constructor(
    name: string,
    meetingDay: DAY,
    startTime: number,
    endTime: number,
    args?: {
      id?: string | undefined;
      practicum?: PracticumEntity | undefined;
      practicumId?: string | undefined;
      students?: ProfileEntity[];
      studentsCount?: number;
    }
  ) {
    this._name = name;
    this._meetingDay = meetingDay;
    this._startTime = startTime;
    this._endTime = endTime;
    this.id = args?.id;
    this.practicum = args?.practicum;
    this.practicumId = args?.practicumId;
    this._students = args?.students ?? [];
    this.studentsCount = args?.studentsCount;
  }

  public get studentsCount(): number | undefined {
    return this._studentsCount;
  }
  public set studentsCount(value: number | undefined) {
    this._studentsCount = value;
  }

  public get practicumId(): string | undefined {
    return this._practicumId;
  }
  public set practicumId(value: string | undefined) {
    this._practicumId = value;
  }

  public get students(): ProfileEntity[] {
    return this._students;
  }
  public set students(value: ProfileEntity[]) {
    this._students = value;
  }

  public get practicum(): PracticumEntity | undefined {
    return this._practicum;
  }
  public set practicum(value: PracticumEntity | undefined) {
    this._practicum = value;
  }

  public get endTime(): number {
    return this._endTime;
  }
  public set endTime(value: number) {
    this._endTime = value;
  }

  public get startTime(): number {
    return this._startTime;
  }
  public set startTime(value: number) {
    this._startTime = value;
  }

  public get meetingDay(): DAY {
    return this._meetingDay;
  }
  public set meetingDay(value: DAY) {
    this._meetingDay = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
