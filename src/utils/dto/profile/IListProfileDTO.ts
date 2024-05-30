import { USER_ROLE } from "@prisma/client";
import { ProfileEntity } from "../../../entity/profile/ProfileEntitiy";

interface IListProfileDTO {
  nickname?: string;
  fullname: string;
  username: string;
  role: USER_ROLE;
  user?: {
    id: string;
  };
  id: string;
}

export const listProfileDTO = (profile: ProfileEntity) => {
  return {
    id: profile.id,
    user: { id: profile.userId },
    fullname: profile.fullname,
    role: profile.user?.role,
    username: profile.username,
    nickname: profile.nickname,
  } as IListProfileDTO;
};
