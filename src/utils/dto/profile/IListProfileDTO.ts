import { USER_ROLE } from "@prisma/client";
import { ProfileEntity } from "../../../entity/profile/ProfileEntitiy";

interface IListProfileDTO {
  nickname?: string;
  fullname: string;
  username: string;
  role: USER_ROLE;
  profilePic: string;
  classOf: string;
  user?: {
    id: string;
  };
  id: string;
}

export const ListProfileDTO = (profile: ProfileEntity) => {
  return {
    id: profile.id,
    user: { id: profile.userId },
    fullname: profile.fullname,
    role: profile.user?.role,
    username: profile.username,
    nickname: profile.nickname,
    classOf: profile.classOf,
    profilePic: profile.profilePic,
  } as IListProfileDTO;
};
