import { USER_ROLE } from "@prisma/client";
import { ProfileEntity } from "../profile/ProfileEntitiy";

export class UserEntity {
  private _id?: string | undefined;
  private _username: string;
  private _password: string;
  private _role: USER_ROLE;
  private _profile?: ProfileEntity | undefined;

  constructor(
    username: string,
    password: string,
    role: USER_ROLE,
    args?: { id?: string | undefined; profile?: ProfileEntity | undefined }
  ) {
    this._username = username;
    this._password = password;
    this._role = role;
    this.id = args?.id;
    this.profile = args?.profile;
  }

  public get profile(): ProfileEntity | undefined {
    return this._profile;
  }
  public set profile(value: ProfileEntity | undefined) {
    this._profile = value;
  }

  public get role(): USER_ROLE {
    return this._role;
  }
  public set role(value: USER_ROLE) {
    this._role = value;
  }

  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
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
