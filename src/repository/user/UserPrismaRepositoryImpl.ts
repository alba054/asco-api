import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserEntity } from "../../entity/user/UserEntity";
import { UserRepository } from "./UserRepository";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../utils";
import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";

export class UserPrismaRepositoryImpl extends UserRepository {
  async deleteUserByUsername(username: string): Promise<void> {
    try {
      await prismaDb.db?.user.delete({
        where: { username },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }

  async createUsers(user: UserEntity[]): Promise<void> {
    try {
      const transactions: any = [];
      user?.forEach((u) => {
        transactions.push(
          prismaDb.db?.user.create({
            data: {
              password: u.password,
              role: u.role,
              username: u.username,
              profile: {
                create: {
                  classOf: u.profile?.classOf ?? "",
                  fullname: u.profile?.fullname ?? "",
                  nickname: u.profile?.nickname ?? "",
                  username: u.username,
                },
              },
            },
          })
        );
      });

      await prismaDb.db?.$transaction(transactions);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    const user = await prismaDb.db?.user.findUnique({
      where: { username },
      include: { profile: true },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(user.username, user.password, user.role, {
      id: user.id,
      profile: new ProfileEntity(
        user.profile?.username ?? "",
        user.profile?.fullname ?? "",
        user.profile?.nickname ?? "",
        user.profile?.classOf ?? "",
        {
          userId: user.profile?.userId ?? "",
          githubUsername: user.profile?.githubUsername ?? "",
          id: user.profile?.id ?? "",
          instagramUsername: user.profile?.instagramUsername ?? "",
          profilePic: user.profile?.profilePic ?? "",
        }
      ),
    });
  }
}
