import { UserEntity } from "../../entity/user/UserEntity";

export abstract class UserRepository {
  abstract deleteUserByUsername(username: string): Promise<void>;
  abstract createUsers(user: UserEntity[]): Promise<void>;
  abstract getUserByUsername(username: string): Promise<UserEntity | null>;
}
