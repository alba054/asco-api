import { USER_ROLE } from "@prisma/client";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { ProfileRepository } from "./ProfileRepository";

export class ProfilePrismaRepositoryImpl extends ProfileRepository {
  async getProfiles(
    s?: string | undefined,
    role?: USER_ROLE | undefined
  ): Promise<ProfileEntity[]> {
    const profiles = await prismaDb.db?.profile.findMany({
      where: {
        AND: [
          {
            user: {
              role,
            },
          },
          // {
          //   OR: [{ username: { contains: s } }, { fullname: { contains: s } }],
          // },
        ],
      },
    });

    return (
      profiles?.map((p) => {
        return new ProfileEntity(
          p.username,
          p.fullname,
          p.nickname,
          p.classOf,
          { userId: p.userId, id: p.id }
        );
      }) ?? []
    );
  }

  async getProfileByUsername(username: string): Promise<ProfileEntity | null> {
    const profile = await prismaDb.db?.profile.findUnique({
      where: { username },
    });

    if (!profile) {
      return null;
    }

    return new ProfileEntity(
      profile.username,
      profile.fullname,
      profile.nickname,
      profile.classOf,
      {
        githubUsername: profile.githubUsername ?? "",
        id: profile.id,
        instagramUsername: profile.instagramUsername ?? "",
        profilePic: profile.profilePic ?? "",
      }
    );
  }
}
