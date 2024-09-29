import { USER_ROLE } from "@prisma/client";

export interface IPutUserPayload {
  readonly githubUsername?: string;
  readonly instagramUsername?: string;
  readonly username?: string;
  readonly password?: string;
  readonly fullname?: string;
  readonly classOf?: string;
  readonly role?: USER_ROLE;
}
