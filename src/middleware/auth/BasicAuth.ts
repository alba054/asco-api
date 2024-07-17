import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { ERRORCODE, setTokenPayload } from "../../utils";
import { UnauthenticatedError } from "../../Exceptions/http/UnauthenticatedError";
import { ITokenPayload } from "../../utils/interfaces/ITokenPayload";
import { UserService } from "../../services/user/UserService";
import { HashAbstract } from "../../config/crypto/HashAbstract";

export class BasicAuthMiddleware {
  private userService: UserService;
  private hashImpl: HashAbstract;

  constructor(userService: UserService, hashImpl: HashAbstract) {
    this.userService = userService;
    this.hashImpl = hashImpl;
  }

  private static checkBasicAuth() {
    return function (req: Request, res: Response, next: NextFunction) {
      const { authorization } = req.headers;
      const basicSchema = authorization?.split(" ");

      if (!basicSchema) {
        // todo: handler for authorization is not provided
        return next(
          new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            "Provide Authorization in header"
          )
        );
      }

      if (basicSchema[0] !== "Basic") {
        // todo: handler for invalid schema (without Basic Prefix)
        return next(
          new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            'Invalid schema. provide "Basic <credential>"'
          )
        );
      }

      console.log(basicSchema[0], basicSchema[1]);

      if (!basicSchema[1]) {
        // todo: handler for authorization credential is not provided
        return next(
          new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            "provide credential"
          )
        );
      }

      // todo: decode provided base64 credential
      let providedCredential = Buffer.from(basicSchema[1], "base64").toString(
        "utf-8"
      );

      const username = providedCredential.split(":")[0];
      const password = providedCredential.split(":")[1];

      if (!username || !password) {
        // todo: handler for username or password is not provided
        return next(
          new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            "provide credential in <username:password> format. encode it in base64"
          )
        );
      }

      res.locals.credential = { username, password };
      next();
    };
  }

  authenticate() {
    return (req: Request, res: Response, next: NextFunction) => {
      BasicAuthMiddleware.checkBasicAuth()(req, res, async () => {
        try {
          if (!res.locals.credential) {
            throw new BadRequestError(
              ERRORCODE.MISSING_VALUE_HEADER_ERROR,
              "provide credential"
            );
          }

          const user = await this.userService.getUserByUsername(
            res.locals.credential.username
          );

          const passwordIsCorrect = await this.hashImpl.compare(
            res.locals.credential.password,
            user.password ?? ""
          );

          if (!passwordIsCorrect) {
            throw new UnauthenticatedError(
              ERRORCODE.PASSWORD_INCORRECT_ERROR,
              "password is incorrect"
            );
          }

          setTokenPayload(res, {
            username: user.username,
            userId: user.id,
            userRole: user.role,
            profileId: user.profile?.id,
          } as ITokenPayload);

          next();
        } catch (error) {
          return next(error);
        }
      });
    };
  }
}
