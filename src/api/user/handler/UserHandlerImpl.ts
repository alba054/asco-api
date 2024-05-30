import { Request, Response, NextFunction } from "express";
import { UserHandler } from "./UserHandler";
import {
  RESPONSE_MESSAGE,
  createResponse,
  getTokenPayload,
} from "../../../utils";
import { UserService } from "../../../services/user/UserService";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { AuthService } from "../../../services/auth/AuthService";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IPostUserPayload } from "../../../utils/interfaces/request/IPostUserPayload";
import { UserPostPayloadSchema } from "../../../utils/validator/user/Joi/UserPostPayloadSchema";
import { ITokenPayload } from "../../../utils/interfaces/ITokenPayload";
import { ProfileService } from "../../../services/profile/ProfileService";
import { profileDTO } from "../../../utils/dto/profile/IProfileDTO";
import { listProfileDTO } from "../../../utils/dto/profile/IListProfileDTO";

export class UserHandlerImpl extends UserHandler {
  private authService: AuthService;
  private userService: UserService;
  private profileService: ProfileService;

  private schemaValidator: SchemaValidator;

  constructor(
    service: {
      authService: AuthService;
      userService: UserService;
      profileService: ProfileService;
    },
    schemaValidator: SchemaValidator
  ) {
    super();
    this.authService = service.authService;
    this.userService = service.userService;
    this.profileService = service.profileService;
    this.schemaValidator = schemaValidator;
  }

  async deleteUser(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { username } = req.params;

    try {
      await this.userService.deleteUserByUsername(username);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "delete user succesfully")
        );
    } catch (error) {
      return next(error);
    }
  }

  async getUsersMaster(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { s, role } = req.query;

    const users = await this.profileService.getProfiles(String(s), role);

    return res
      .status(200)
      .json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, users.map(listProfileDTO))
      );
  }

  async getUserCredential(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const tokenPayload: ITokenPayload = getTokenPayload(res);

    try {
      const user = await this.profileService.getProfileByUsername(
        tokenPayload.username
      );

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, profileDTO(user)));
    } catch (error) {
      return next(error);
    }
  }

  async postUser(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const payload: IPostUserPayload = req.body;

    try {
      this.schemaValidator.validate({ schema: UserPostPayloadSchema, payload });

      await this.userService.addNewUser(payload);

      return res
        .status(201)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, "succesfully add user"));
    } catch (error) {
      return next(error);
    }
  }

  async postUserLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.authService.generateToken(getTokenPayload(res));

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, token));
    } catch (error) {
      return next(error);
    }
  }
}
