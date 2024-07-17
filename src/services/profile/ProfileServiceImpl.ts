import { USER_ROLE } from "@prisma/client";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ProfileRepository } from "../../repository/profile/ProfileRepository";
import { ERRORCODE } from "../../utils";
import { ProfileService } from "./ProfileService";

export class ProfileServiceImpl extends ProfileService {
  constructor(repository: { profileRepository: ProfileRepository }) {
    super(repository);
  }

  async getProfiles(
    s?: any,
    role?: any,
    practicum?: any
  ): Promise<ProfileEntity[]> {
    return await this.profileRepository.getProfiles(s, role, practicum);
  }

  async getProfileByUsername(username: string): Promise<ProfileEntity> {
    const profile = await this.profileRepository.getProfileByUsername(username);

    if (!profile) {
      throw new NotFoundError(
        ERRORCODE.USER_NOT_FOUND_ERROR,
        "user's not found"
      );
    }

    return profile;
  }
}
