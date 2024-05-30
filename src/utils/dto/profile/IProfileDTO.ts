import { ProfileEntity } from "../../../entity/profile/ProfileEntitiy";

interface IProfileDTO {
  profileId: string;
  username: string;
  fullname: string;
  nickname: string;
  classOf: string;
  githubUsername?: string;
  instagramUsername?: string;
  profilePic?: string;
}

export const profileDTO = (profile: ProfileEntity) => {
  return {
    classOf: profile.classOf,
    fullname: profile.fullname,
    nickname: profile.nickname,
    profileId: profile.id,
    username: profile.username,
    githubUsername: profile.githubUsername,
    instagramUsername: profile.instagramUsername,
    profilePic: profile.profilePic,
  } as IProfileDTO;
};
