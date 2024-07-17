import { Response } from "express";
import { ITokenPayload } from "./interfaces/ITokenPayload";
import crypto from "crypto";

export const createResponse = (
  status: string,
  data: any = null,
  error?: { code: string; message?: string } | undefined | null
) => {
  return { status, error, data };
};

export const ERRORCODE = {
  INTERNAL_SERVER_ERROR_CODE: "E501",
  UNIQUE_CONSTRAINT_ERROR: "E401",
  USER_NOT_FOUND_ERROR: "E402",
  LONG_VALUE_ERROR: "E403",
  INVALID_VALUE_ERROR: "E404",
  BAD_REQUEST_ERROR: "E400",
  PROFILE_PICTURE_NOT_FOUND_ERROR: "E405",
  PAYLOAD_NOT_FOUND: "E406",
  VALIDATOR_ERROR: "E407",
  MISSING_VALUE_HEADER_ERROR: "E408",
  TOKEN_NOT_PROVIDED_ERROR: "E409",
  UNAUTHORIZED_ROLE_ERROR: "E410",
  TOKEN_EXPIRED_ERROR: "E411",
  INVALID_TOKEN_ERROR: "E412",
  MALFORMED_TOKEN_ERROR: "E413",
  PASSWORD_INCORRECT_ERROR: "E414",
  COMMON_NOT_FOUND: "E444",
};

/**
 *
 * @param epochMiliSecond epoch in milisecond
 * @param offset difference from utc time, ex. gmt+8 -> 8, gmt-8 -> -8
 * @returns date object after calculating based on offset
 */
export const convertEpochToDate = (epochMiliSecond: number, offset: number) => {
  const convertedEpoch = epochMiliSecond + offset * 60 * 60 * 1000;
  return new Date(convertedEpoch);
};

export const getTokenPayload = (res: Response): ITokenPayload => {
  return res.locals.user;
};

export const setTokenPayload = (
  res: Response,
  tokenPayload: ITokenPayload
): void => {
  res.locals.user = tokenPayload;
};

export const constants = {
  ACCESS_TOKEN_EXP: 24 * 60 * 60 * 30, // *  1 month
  REFRESH_TOKEN_EXP: 24 * 60 * 60 * 30, // * 1 month
  INVALID_TOKEN: "token is invalid",
  MALFORMED_TOKEN:
    "token is not formed correctly. JWT format is xxxx.yyyyy.zzzz",
  SIGNATURE_REQUIRED: "provide secret key to verify token",
  INVALID_SIGNATURE: "secret key is not valid",
  SUCCESS_RESPONSE_MESSAGE: "success",
  FAILED_RESPONSE_MESSAGE: "success",
  PAGINATION_OFFSET: 20,
  GCS_OBJECT_BASE: (filename?: string) => {
    if (!filename) return null;
    return `https://storage.googleapis.com/asco-app-2905.appspot.com/${filename}`;
  },
};

export enum RESPONSE_MESSAGE {
  SUCCESS = "success",
  FAILED = "failed",
}

export const hashData = (data: string, algorithm: string, salt?: string) => {
  // Create a SHA256 hash object
  const hash = crypto.createHash(algorithm);

  // Combine the salt and data
  const saltedData = (salt ?? "") + data;

  // Update the hash object with the salted data
  hash.update(saltedData, "utf8");

  // Generate the hexadecimal hash
  const hashedData = hash.digest("hex");

  return hashedData;
};

/**
 *
 * @param time hour:minute:second
 * @return formatted interger
 */
export const formatHourMinuteSecond = (time: string): number => {
  const formattedTime = time.split(":");

  return (
    parseInt(formattedTime.at(0) ?? "0") * 3600 +
    parseInt(formattedTime.at(1) ?? "0") * 60 +
    parseInt(formattedTime.at(2) ?? "0")
  );
};
