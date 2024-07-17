import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { ProfileRepository } from "../../repository/profile/ProfileRepository";

export abstract class ProfileService {
  protected profileRepository: ProfileRepository;

  constructor(repository: { profileRepository: ProfileRepository }) {
    this.profileRepository = repository.profileRepository;
  }

  abstract getProfiles(
    s?: any,
    role?: any,
    practicum?: any
  ): Promise<ProfileEntity[]>;

  abstract getProfileByUsername(username: string): Promise<ProfileEntity>;
}
