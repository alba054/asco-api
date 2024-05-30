import { ITokenPayload } from "../../utils/interfaces/ITokenPayload";

export abstract class AuthService {
  abstract generateToken(
    tokenPayload: ITokenPayload
  ): Promise<{ accessToken: string | undefined }>;
}
