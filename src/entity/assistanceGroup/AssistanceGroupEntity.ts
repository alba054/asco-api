// id             String    @id @default(uuid())
//   number         Int       @db.UnsignedSmallInt
//   assistant      Profile   @relation(name: "assistant_group_assistant", fields: [assistantId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   students       Profile[] @relation(name: "assistant_group_student")
//   practicum      Practicum @relation(fields: [practicumId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   githubRepoLink String?   @db.VarChar(255)
//   createdAt      DateTime  @default(now())
//   updatedAt      DateTime  @default(now()) @updatedAt
//   assistantId    String
//   practicumId    String

import { PracticumEntity } from "../practicum/PracticumEntity";
import { ProfileEntity } from "../profile/ProfileEntitiy";

export class AssistanceGroupEntity {
  private _id?: string | undefined;
  private _number: number;
  private _assistantId?: string | undefined;
  private _assistant?: ProfileEntity | undefined;
  private _githubRepoLink?: string | undefined;
  private _students?: ProfileEntity[] | undefined;
  private _studentIds?: string[] | undefined;
  private _practicumId?: string | undefined;
  private _practicum?: PracticumEntity | undefined;

  constructor(
    number: number,
    args?: {
      id?: string;
      assistantId?: string;
      githubRepoLink?: string;
      students?: ProfileEntity[];
      assistant?: ProfileEntity;
      practicumId?: string;
      practicum?: PracticumEntity;
      studentIds?: string[];
    }
  ) {
    this._number = number;
    this.id = args?.id;
    this.assistantId = args?.assistantId;
    this.githubRepoLink = args?.githubRepoLink;
    this.students = args?.students;
    this.assistant = args?.assistant;
    this.practicumId = args?.practicumId;
    this.practicum = args?.practicum;
    this.studentIds = args?.studentIds;
  }

  public get studentIds(): string[] | undefined {
    return this._studentIds;
  }
  public set studentIds(value: string[] | undefined) {
    this._studentIds = value;
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

  public get students(): ProfileEntity[] | undefined {
    return this._students;
  }
  public set students(value: ProfileEntity[] | undefined) {
    this._students = value;
  }

  public get githubRepoLink(): string | undefined {
    return this._githubRepoLink;
  }
  public set githubRepoLink(value: string | undefined) {
    this._githubRepoLink = value;
  }

  public get assistant(): ProfileEntity | undefined {
    return this._assistant;
  }
  public set assistant(value: ProfileEntity | undefined) {
    this._assistant = value;
  }

  public get assistantId(): string | undefined {
    return this._assistantId;
  }
  public set assistantId(value: string | undefined) {
    this._assistantId = value;
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
