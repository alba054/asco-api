import { UserRepository } from "../../repository/user/UserRepository";
import { UserEntity } from "../../entity/user/UserEntity";
import { IPostUserPayload } from "../../utils/interfaces/request/IPostUserPayload";

export abstract class UserService {
  protected userRepository: UserRepository;

  constructor(repository: { userRepository: UserRepository }) {
    this.userRepository = repository.userRepository;
  }

  abstract deleteUserByUsername(username: string): Promise<void>;

  abstract addNewUser(payload: IPostUserPayload): Promise<void>;

  abstract getUserByUsername(username: string): Promise<UserEntity>;
}
