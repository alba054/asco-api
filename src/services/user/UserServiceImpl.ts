import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { UserRepository } from "../../repository/user/UserRepository";
import { UserEntity } from "../../entity/user/UserEntity";
import { ERRORCODE } from "../../utils";
import { UserService } from "./UserService";
import { IPostUserPayload } from "../../utils/interfaces/request/IPostUserPayload";
import { bcryptHash } from "../../config/crypto/BcryptImpl";
import { ProfileEntity } from "../../entity/profile/ProfileEntitiy";

export class UserServiceImpl extends UserService {
  constructor(repository: { userRepository: UserRepository }) {
    super(repository);
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
