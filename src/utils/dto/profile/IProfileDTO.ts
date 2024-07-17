import { USER_ROLE } from "@prisma/client";
import { ProfileEntity } from "../../../entity/profile/ProfileEntitiy";
import { constants } from "../..";

interface IProfileDTO {
  profileId: string;
  username: string;
  fullname: string;
  nickname: string;
  classOf: string;
  githubUsername?: string;
  instagramUsername?: string;
  profilePic?: string;
  role: USER_ROLE;
}

export const ProfileDTO = (profile: ProfileEntity) => {
  return {
    classOf: profile.classOf,
    fullname: profile.fullname,
    nickname: profile.nickname,
    profileId: profile.id,
    username: profile.username,
    githubUsername: profile.githubUsername,
    instagramUsername: profile.instagramUsername,
    profilePic: constants.GCS_OBJECT_BASE(profile.profilePic),
    role: profile.user?.role,
  } as IProfileDTO;
};
