import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../Exceptions/http/BadRequestError";
import { ERRORCODE, constants, setTokenPayload } from "../../utils";
import { CONFIG_ENV } from "../../config/env";
import { InternalServerError } from "../../Exceptions/http/InternalServerError";
import { tokenGenerator } from "../../utils/auth/TokenGenerator";
import { UnauthorizedError } from "../../Exceptions/http/UnauthorizedError";
import { UnauthenticatedError } from "../../Exceptions/http/UnauthenticatedError";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UserService } from "../../services/user/UserService";
import { USER_ROLE } from "@prisma/client";

export class AuthorizationBearer {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  authorize(role: USER_ROLE[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;
      const bearerSchema = authorization?.split(" ");

      try {
        if (!bearerSchema) {
          // todo: handler for authorization is not provided
          throw new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            "Provide Authorization in header"
          );
        }

        if (bearerSchema[0] !== "Bearer") {
          // todo: handler for invalid schema (without Basic Prefix)
          throw new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            'Invalid schema. provide "Bearer <token>"'
          );
        }

        if (!bearerSchema[1]) {
          // todo: handler for authorization credential is not provided
          throw new BadRequestError(
            ERRORCODE.MISSING_VALUE_HEADER_ERROR,
            "provide token"
          );
        }

        const token = bearerSchema[1];

        if (!CONFIG_ENV.JWT_SECRET) {
          throw new InternalServerError(ERRORCODE.INTERNAL_SERVER_ERROR_CODE);
        }

        const tokenPayload = await tokenGenerator.verify(
          token,
          CONFIG_ENV.JWT_SECRET,
          {
            issuer: CONFIG_ENV.ISSUER,
          }
        );

        if (!tokenPayload) {
          throw new UnauthorizedError(
            ERRORCODE.TOKEN_NOT_PROVIDED_ERROR,
            "provide token"
          );
        }

        const user = await this.userService.getUserByUsername(
          tokenPayload.username
        );

        if (!role.includes(user.role)) {
          throw new UnauthorizedError(
            ERRORCODE.UNAUTHORIZED_ROLE_ERROR,
            "you are not authorized"
          );
        }

        setTokenPayload(res, tokenPayload);

        next();
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          return next(
            new UnauthenticatedError(
              ERRORCODE.TOKEN_EXPIRED_ERROR,
              error.message
            )
          );
        } else if (error instanceof JsonWebTokenError) {
          if (error.message === "invalid token") {
            // todo: BadRequestError with custom invalid token message
            return next(
              new BadRequestError(
                ERRORCODE.INVALID_TOKEN_ERROR,
                constants.INVALID_TOKEN
              )
            );
          } else if (error.message === "jwt malformed") {
            // todo: BadRequestError with custom token malformed message
            return next(
              new BadRequestError(
                ERRORCODE.MALFORMED_TOKEN_ERROR,
                constants.MALFORMED_TOKEN
              )
            );
          } else if (error.message === "jwt signature is required") {
            // todo: BadRequestError with custom required signature message
            return next(
              new BadRequestError(
                ERRORCODE.INVALID_TOKEN_ERROR,
                constants.SIGNATURE_REQUIRED
              )
            );
          } else if (error.message === "invalid signature") {
            // todo: BadRequestError with custom invalid signature message
            return next(
              new BadRequestError(
                ERRORCODE.INVALID_TOKEN_ERROR,
                constants.INVALID_SIGNATURE
              )
            );
          } else {
            return next(
              new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message)
            );
          }
        }
        return next(error);
      }
    };
  }
}
