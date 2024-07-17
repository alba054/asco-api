// id                       String           @id @default(uuid())
//   username                 String           @unique @db.VarChar(255)
//   fullname                 String           @db.VarChar(255)
//   nickname                 String           @db.VarChar(50)
//   classOf                  String           @db.VarChar(5)
//   githubUsername           String?          @db.VarChar(255)
//   instagramUsername        String?          @db.VarChar(255)
//   profilePic               String?          @db.VarChar(255)
//   user                     User             @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   userId                   String           @unique
//   practicums               Practicum[]
//   createdAt                DateTime         @default(now())
//   updatedAt                DateTime         @default(now()) @updatedAt
//   practicumId              String?
//   classrooms               Classroom[]
//   assistantMeetings        Meeting[]        @relation(name: "meeting_assistant")
//   coAssistantMeetings      Meeting[]        @relation(name: "meeting_co_assistant")
//   attendances              Attendance[]
//   assistantAssistantGroups AssistantGroup[] @relation(name: "assistant_group_assistant")
//   studentAssistantGroups   AssistantGroup[] @relation(name: "assistant_group_student")
//   controlCards             ControlCard[]
//   scores                   Score[]
//   LabExamScore             LabExamScore[]

import { PracticumEntity } from "../practicum/PracticumEntity";
import { UserEntity } from "../user/UserEntity";

export class ProfileEntity {
  private _id?: string | undefined;
  private _username: string;
  private _fullname: string;
  private _nickname: string;
  private _classOf: string;
  private _githubUsername?: string | undefined;
  private _instagramUsername?: string | undefined;
  private _profilePic?: string | undefined;
  private _userId?: string | undefined;
  private _user?: UserEntity | undefined;
  private _practicums?: PracticumEntity[] | undefined;

  constructor(
    username: string,
    fullname: string,
    nickname: string,
    classOf: string,
    args?: {
      userId?: string | undefined;
      id?: string | undefined;
      githubUsername?: string | undefined;
      instagramUsername?: string | undefined;
      profilePic?: string | undefined;
      user?: UserEntity | undefined;
      practicums?: PracticumEntity[];
    }
  ) {
    this.user = args?.user;
    this._classOf = classOf;
    this._username = username;
    this._fullname = fullname;
    this._nickname = nickname;
    this._userId = args?.userId;
    this.githubUsername = args?.githubUsername;
    this.instagramUsername = args?.instagramUsername;
    this.profilePic = args?.profilePic;
    this.id = args?.id;
    this.practicums = args?.practicums;
  }

  public get practicums(): PracticumEntity[] | undefined {
    return this._practicums;
  }
  public set practicums(value: PracticumEntity[] | undefined) {
    this._practicums = value;
  }

  public get user(): UserEntity | undefined {
    return this._user;
  }
  public set user(value: UserEntity | undefined) {
    this._user = value;
  }

  public get userId(): string | undefined {
    return this._userId;
  }
  public set userId(value: string | undefined) {
    this._userId = value;
  }

  public get profilePic(): string | undefined {
    return this._profilePic;
  }
  public set profilePic(value: string | undefined) {
    this._profilePic = value;
  }

  public get instagramUsername(): string | undefined {
    return this._instagramUsername;
  }
  public set instagramUsername(value: string | undefined) {
    this._instagramUsername = value;
  }

  public get githubUsername(): string | undefined {
    return this._githubUsername;
  }
  public set githubUsername(value: string | undefined) {
    this._githubUsername = value;
  }

  public get classOf(): string {
    return this._classOf;
  }
  public set classOf(value: string) {
    this._classOf = value;
  }

  public get nickname(): string {
    return this._nickname;
  }
  public set nickname(value: string) {
    this._nickname = value;
  }

  public get fullname(): string {
    return this._fullname;
  }
  public set fullname(value: string) {
    this._fullname = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
