import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { CONFIG_ENV } from "../../config/env";
import { ERRORCODE } from "../../utils";
import { tokenGenerator } from "../../utils/auth/TokenGenerator";
import { ITokenPayload } from "../../utils/interfaces/ITokenPayload";
import { AuthService } from "./AuthService";

export class AuthServiceImpl extends AuthService {
  async generateToken(
    tokenPayload: ITokenPayload
  ): Promise<{ accessToken: string | undefined }> {
    if (!CONFIG_ENV.JWT_SECRET) {
      throw new InternalServerError(ERRORCODE.INTERNAL_SERVER_ERROR_CODE);
    }

    let accessTokenClaims = { subject: tokenPayload.username };

    Object.assign(accessTokenClaims, CONFIG_ENV.ACCESS_TOKEN_CLAIMS);

    const realPayload: ITokenPayload = {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
      userRole: tokenPayload.userRole,
    };

    const accessToken = await tokenGenerator.sign(
      realPayload,
      CONFIG_ENV.JWT_SECRET,
      accessTokenClaims
    );

    return { accessToken };
  }
}
