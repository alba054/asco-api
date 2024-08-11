import { AssistanceEntity } from "../assistance/AssistanceEntity";
import { AssistanceGroupEntity } from "../assistanceGroup/AssistanceGroupEntity";
import { MeetingEntity } from "../meeting/MeetingEntity";
import { PracticumEntity } from "../practicum/PracticumEntity";
import { ProfileEntity } from "../profile/ProfileEntitiy";

// id                 String     @id @default(uuid())
// student            Profile    @relation(fields: [profileId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// meeting            Meeting    @relation(fields: [meetingId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// firstAssistance    Assistance @relation(name: "control_card_first_assistance", fields: [firstAssistanceId], references: [id])
// secondAssistance   Assistance @relation(name: "control_card_second_assistance", fields: [secondAssistanceId], references: [id])
// createdAt          DateTime   @default(now())
// updatedAt          DateTime   @default(now()) @updatedAt
// profileId          String
// meetingId          String
// firstAssistanceId  String     @unique
// secondAssistanceId String     @unique
// practicum          Practicum? @relation(fields: [practicumId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// practicumId        String?

export class ControlCardEntity {
  private _id?: string | undefined;
  private _student?: ProfileEntity | undefined;
  private _studentId: string;
  private _practicumId: string;
  private _practicum?: PracticumEntity | undefined;
  private _meeting?: MeetingEntity | undefined;
  private _meetingId: string;
  private _firstAssistance?: AssistanceEntity | undefined;
  private _secondAssistance?: AssistanceEntity | undefined;
  private _firstAssistanceId?: string | undefined;
  private _secondAssistanceId?: string | undefined;
  private _group?: AssistanceGroupEntity | undefined;

  constructor(
    practicumId: string,
    studentId: string,
    meetingId: string,
    args?: {
      id?: string;
      student?: ProfileEntity;
      practicum?: PracticumEntity;
      meeting?: MeetingEntity;
      firstAssistance?: AssistanceEntity;
      secondAssistance?: AssistanceEntity;
      firstAssistanceId?: string;
      secondAssistanceId?: string;
      group?: AssistanceGroupEntity;
    }
  ) {
    this._practicumId = practicumId;
    this._studentId = studentId;
    this._meetingId = meetingId;
    this.id = args?.id;
    this.student = args?.student;
    this.practicum = args?.practicum;
    this.meeting = args?.meeting;
    this.firstAssistance = args?.firstAssistance;
    this.secondAssistance = args?.secondAssistance;
    this.firstAssistanceId = args?.firstAssistanceId;
    this.secondAssistanceId = args?.secondAssistanceId;
    this.group = args?.group;
  }

  public get group(): AssistanceGroupEntity | undefined {
    return this._group;
  }
  public set group(value: AssistanceGroupEntity | undefined) {
    this._group = value;
  }

  public get firstAssistanceId(): string | undefined {
    return this._firstAssistanceId;
  }
  public set firstAssistanceId(value: string | undefined) {
    this._firstAssistanceId = value;
  }

  public get secondAssistanceId(): string | undefined {
    return this._secondAssistanceId;
  }
  public set secondAssistanceId(value: string | undefined) {
    this._secondAssistanceId = value;
  }

  public get secondAssistance(): AssistanceEntity | undefined {
    return this._secondAssistance;
  }
  public set secondAssistance(value: AssistanceEntity | undefined) {
    this._secondAssistance = value;
  }

  public get firstAssistance(): AssistanceEntity | undefined {
    return this._firstAssistance;
  }
  public set firstAssistance(value: AssistanceEntity | undefined) {
    this._firstAssistance = value;
  }

  public get meetingId(): string {
    return this._meetingId;
  }
  public set meetingId(value: string) {
    this._meetingId = value;
  }

  public get meeting(): MeetingEntity | undefined {
    return this._meeting;
  }
  public set meeting(value: MeetingEntity | undefined) {
    this._meeting = value;
  }

  public get practicum(): PracticumEntity | undefined {
    return this._practicum;
  }
  public set practicum(value: PracticumEntity | undefined) {
    this._practicum = value;
  }

  public get practicumId(): string {
    return this._practicumId;
  }
  public set practicumId(value: string) {
    this._practicumId = value;
  }

  public get studentId(): string {
    return this._studentId;
  }

  public set studentId(value: string) {
    this._studentId = value;
  }

  public get student(): ProfileEntity | undefined {
    return this._student;
  }
  public set student(value: ProfileEntity | undefined) {
    this._student = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
