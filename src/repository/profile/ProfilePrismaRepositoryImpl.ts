import { USER_ROLE } from "@prisma/client";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { ProfileRepository } from "./ProfileRepository";
import { UserEntity } from "../../entity/user/UserEntity";

export class ProfilePrismaRepositoryImpl extends ProfileRepository {
  async getProfiles(
    s?: string | undefined,
    role?: USER_ROLE | undefined,
    practicum?: string | undefined
  ): Promise<ProfileEntity[]> {
    const profiles = await prismaDb.db?.profile.findMany({
      where: {
        AND: [
          {
            user: {
              role,
            },
          },
          practicum ? {
            practicums: {
              some: {
                id: practicum,
              },
            },
          } : {},
          {
            OR: [{ username: { contains: s } }, { fullname: { contains: s } }],
          },
        ],
      },
      include: {
        user: {
          select: {
            role: true,
          },
        },
      },
    });

    return (
      profiles?.map((p) => {
        return new ProfileEntity(
          p.username,
          p.fullname,
          p.nickname,
          p.classOf,
          {
            userId: p.userId,
            id: p.id,
            user: new UserEntity(p.username, "", p.user.role),
            profilePic: p.profilePic ?? "",
          }
        );
      }) ?? []
    );
  }

  async getProfileByUsername(username: string): Promise<ProfileEntity | null> {
    const profile = await prismaDb.db?.profile.findUnique({
      where: { username },
      include: {
        user: {
          select: {
            role: true,
          },
        },
      },
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
        user: new UserEntity(profile.username, "", profile.user.role),
      }
    );
  }
}
