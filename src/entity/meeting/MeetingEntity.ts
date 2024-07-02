// id                 String        @id @default(uuid())
// number             Int           @db.UnsignedSmallInt
// lesson             String        @db.VarChar(255)
// meetingDate        BigInt        @db.UnsignedBigInt
// assistant          Profile       @relation(name: "meeting_assistant", fields: [assistantId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// coAssistant        Profile?      @relation(name: "meeting_co_assistant", fields: [coAssistantId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// module             String?       @db.VarChar(255)
// assignment         String?       @db.VarChar(255)
// assistanceDeadline BigInt        @db.UnsignedBigInt
// practicum          Practicum     @relation(fields: [practicumId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// createdAt          DateTime      @default(now())
// updatedAt          DateTime      @default(now()) @updatedAt
// assistantId        String
// coAssistantId      String?
// practicumId        String
// attendances        Attendance[]
// controlCards       ControlCard[]
// scores             Score[]

import { PracticumEntity } from "../practicum/PracticumEntity";
import { ProfileEntity } from "../profile/ProfileEntitiy";

export class MeetingEntity {
  private _id?: string | undefined;
  private _number: number;
  private _lesson: string;
  private _meetingDate: number;
  private _assistant?: ProfileEntity | undefined;
  private _assistantId?: string | undefined;
  private _coAssistant?: ProfileEntity | undefined;
  private _coAssistantId?: string | undefined;
  private _module?: string | undefined;
  private _assignment?: string | undefined;
  private _assistanceDeadline: number;
  private _practicum?: PracticumEntity | undefined;
  private _practicumId?: string | undefined;

  constructor(
    number: number,
    lesson: string,
    meetingDate: number,
    assistanceDeadline: number,
    args?: {
      id?: string;
      assistant?: ProfileEntity;
      assistantId?: string;
      coAssistant?: ProfileEntity;
      coAssistantId?: string;
      practicum?: PracticumEntity;
      practicumId?: string;
      module?: string;
      assignment?: string;
    }
  ) {
    this._number = number;
    this._lesson = lesson;
    this._meetingDate = meetingDate;
    this._assistanceDeadline = assistanceDeadline;
    this.id = args?.id;
    this.assistant = args?.assistant;
    this.assistantId = args?.assistantId;
    this.coAssistant = args?.coAssistant;
    this.coAssistantId = args?.coAssistantId;
    this.module = args?.module;
    this.assignment = args?.assignment;
    this.practicum = args?.practicum;
    this.practicumId = args?.practicumId;
  }

  public get assignment(): string | undefined {
    return this._assignment;
  }
  public set assignment(value: string | undefined) {
    this._assignment = value;
  }

  public get module(): string | undefined {
    return this._module;
  }
  public set module(value: string | undefined) {
    this._module = value;
  }

  public get practicumId(): string | undefined {
    return this._practicumId;
  }
  public set practicumId(value: string | undefined) {
    this._practicumId = value;
  }

  public get coAssistantId(): string | undefined {
    return this._coAssistantId;
  }
  public set coAssistantId(value: string | undefined) {
    this._coAssistantId = value;
  }

  public get assistantId(): string | undefined {
    return this._assistantId;
  }
  public set assistantId(value: string | undefined) {
    this._assistantId = value;
  }

  public get practicum(): PracticumEntity | undefined {
    return this._practicum;
  }
  public set practicum(value: PracticumEntity | undefined) {
    this._practicum = value;
  }

  public get assistanceDeadline(): number {
    return this._assistanceDeadline;
  }
  public set assistanceDeadline(value: number) {
    this._assistanceDeadline = value;
  }

  public get coAssistant(): ProfileEntity | undefined {
    return this._coAssistant;
  }
  public set coAssistant(value: ProfileEntity | undefined) {
    this._coAssistant = value;
  }

  public get assistant(): ProfileEntity | undefined {
    return this._assistant;
  }
  public set assistant(value: ProfileEntity | undefined) {
    this._assistant = value;
  }

  public get meetingDate(): number {
    return this._meetingDate;
  }
  public set meetingDate(value: number) {
    this._meetingDate = value;
  }

  public get lesson(): string {
    return this._lesson;
  }
  public set lesson(value: string) {
    this._lesson = value;
  }

  public get number(): number {
    return this._number;
  }
  public set number(value: number) {
    this._number = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
