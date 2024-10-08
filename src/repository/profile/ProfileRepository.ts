import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";

export abstract class ProfileRepository {
  abstract getProfileByProfileId(
    profileId: string
  ): Promise<ProfileEntity | null>;
  abstract getProfiles(
    s?: string | undefined,
    role?: string | undefined,
    practicum?: string | undefined
  ): Promise<ProfileEntity[]>;

  abstract getProfileByUsername(
    username: string
  ): Promise<ProfileEntity | null>;
}
