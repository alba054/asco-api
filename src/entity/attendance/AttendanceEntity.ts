// id               String            @id @default(uuid())
//   classroom        Classroom         @relation(fields: [classroomId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   meeting          Meeting           @relation(fields: [meetingId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   student          Profile           @relation(fields: [profileId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   attendanceStatus ATTENDANCE_STATUS @default(ABSENT)
//   extraPoint       Int?              @db.UnsignedSmallInt
//   time             Int?              @db.UnsignedSmallInt
//   note             String?           @db.Text
//   createdAt        DateTime          @default(now())
//   updatedAt        DateTime          @default(now()) @updatedAt
//   classroomId      String
//   meetingId        String
//   profileId        String

import { ATTENDANCE_STATUS } from "@prisma/client";
import { MeetingEntity } from "../meeting/MeetingEntity";
import { ProfileEntity } from "../profile/ProfileEntitiy";

export class AttendanceEntity {
  private _id?: string | undefined;
  private _meeting?: MeetingEntity | undefined;
  private _student?: ProfileEntity | undefined;
  private _attendanceStatus: ATTENDANCE_STATUS;
  private _extraPoint?: number | undefined;
  private _time?: number | undefined;
  private _note?: string | undefined;
  private _studentId?: string | undefined;
  private _meetingId?: string | undefined;
  private _classroomId?: string | undefined;
  private _practicumId?: string | undefined;

  constructor(
    attendanceStatus: ATTENDANCE_STATUS,
    args?: {
      id?: string;
      meeting?: MeetingEntity;
      student?: ProfileEntity;
      extraPoint?: number;
      time?: number;
      note?: string;
      studentId?: string;
      meetingId?: string;
      classroomId?: string;
      practicumId?: string;
    }
  ) {
    this._attendanceStatus = attendanceStatus;
    this.id = args?.id;
    this.meeting = args?.meeting;
    this.student = args?.student;
    this.extraPoint = args?.extraPoint;
    this.time = args?.time;
    this.note = args?.note;
    this.studentId = args?.studentId;
    this.meetingId = args?.meetingId;
    this.classroomId = args?.classroomId;
    this.practicumId = args?.practicumId;
  }

  public get practicumId(): string | undefined {
    return this._practicumId;
  }
  public set practicumId(value: string | undefined) {
    this._practicumId = value;
  }

  public get classroomId(): string | undefined {
    return this._classroomId;
  }
  public set classroomId(value: string | undefined) {
    this._classroomId = value;
  }

  public get meetingId(): string | undefined {
    return this._meetingId;
  }
  public set meetingId(value: string | undefined) {
    this._meetingId = value;
  }

  public get studentId(): string | undefined {
    return this._studentId;
  }
  public set studentId(value: string | undefined) {
    this._studentId = value;
  }

  public get note(): string | undefined {
    return this._note;
  }
  public set note(value: string | undefined) {
    this._note = value;
  }

  public get time(): number | undefined {
    return this._time;
  }
  public set time(value: number | undefined) {
    this._time = value;
  }

  public get extraPoint(): number | undefined {
    return this._extraPoint;
  }
  public set extraPoint(value: number | undefined) {
    this._extraPoint = value;
  }

  public get attendanceStatus(): ATTENDANCE_STATUS {
    return this._attendanceStatus;
  }
  public set attendanceStatus(value: ATTENDANCE_STATUS) {
    this._attendanceStatus = value;
  }

  public get student(): ProfileEntity | undefined {
    return this._student;
  }
  public set student(value: ProfileEntity | undefined) {
    this._student = value;
  }

  public get meeting(): MeetingEntity | undefined {
    return this._meeting;
  }
  public set meeting(value: MeetingEntity | undefined) {
    this._meeting = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
