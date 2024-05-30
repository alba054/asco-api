import { USER_ROLE } from "@prisma/client";

export interface ITokenPayload {
  readonly username: string;
  readonly userId: string;
  readonly userRole: USER_ROLE;
}
