import { USER_ROLE } from "@prisma/client";

export interface IPostUserPayload {
  readonly data: {
    readonly username: string;
    readonly password: string;
    readonly fullname: string;
    readonly classOf: string;
    readonly role: USER_ROLE;
  }[];
}
