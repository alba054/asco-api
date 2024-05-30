import { USER_ROLE } from "@prisma/client";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { ProfileRepository } from "../../repository/profile/ProfileRepository";

export abstract class ProfileService {
  protected profileRepository: ProfileRepository;

  constructor(repository: { profileRepository: ProfileRepository }) {
    this.profileRepository = repository.profileRepository;
  }

  abstract getProfiles(
    s?: string | undefined,
    role?: any
  ): Promise<ProfileEntity[]>;

  abstract getProfileByUsername(username: string): Promise<ProfileEntity>;
}
