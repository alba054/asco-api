import { UserEntity } from "../../entity/user/UserEntity";

export abstract class UserRepository {
  abstract updateUserByUsername(
    username: string,
    edittedUser: UserEntity
  ): Promise<void>;
  abstract deleteUserByUsername(username: string): Promise<void>;
  abstract createUsers(user: UserEntity[]): Promise<void>;
  abstract getUserByUsername(username: string): Promise<UserEntity | null>;
}
