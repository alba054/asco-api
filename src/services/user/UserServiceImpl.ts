import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { UserRepository } from "../../repository/user/UserRepository";
import { UserEntity } from "../../entity/user/UserEntity";
import { ERRORCODE } from "../../utils";
import { UserService } from "./UserService";
import { IPostUserPayload } from "../../utils/interfaces/request/IPostUserPayload";
import { bcryptHash } from "../../config/crypto/BcryptImpl";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";
import { IPutUserPayload } from "../../utils/interfaces/request/IPutUserPayload";

export class UserServiceImpl extends UserService {
  constructor(repository: { userRepository: UserRepository }) {
    super(repository);
  }

  async updateUserByUsername(
    username: string,
    payload: IPutUserPayload
  ): Promise<void> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundError(
        ERRORCODE.USER_NOT_FOUND_ERROR,
        "user's not found"
      );
    }

    const password = payload.password
      ? bcryptHash.hashSync(payload.password)
      : user.password;

    const edittedUser = new UserEntity(
      payload.username ?? user.username,
      password,
      payload.role ?? user.role,
      {
        profile: new ProfileEntity(
          payload.username ?? user.username,
          payload.fullname ?? user.profile?.fullname ?? "",
          payload.fullname?.split(" ").at(1) ?? user.profile?.nickname ?? "",
          payload.classOf ?? user.profile?.classOf ?? ""
        ),
      }
    );

    await this.userRepository.updateUserByUsername(username, edittedUser);
  }

  async deleteUserByUsername(username: string): Promise<void> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundError(
        ERRORCODE.USER_NOT_FOUND_ERROR,
        "user's not found"
      );
    }

    this.userRepository.deleteUserByUsername(username);
  }

  async addNewUser(payload: IPostUserPayload): Promise<void> {
    const users = payload.data.map((d) => {
      const password = bcryptHash.hashSync(d.password);

      return new UserEntity(d.username, password, d.role, {
        profile: new ProfileEntity(
          d.username,
          d.fullname,
          d.fullname?.split(" ").at(1) ?? d.fullname,
          d.classOf
        ),
      });
    });

    await this.userRepository.createUsers(users);
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundError(
        ERRORCODE.USER_NOT_FOUND_ERROR,
        "user's not found"
      );
    }

    return user;
  }
}
