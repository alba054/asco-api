import { NextFunction, Request, Response } from "express";
import { createResponse } from "../../utils";
import { WebError } from "../../Exceptions/http/WebError";

export const ErrorHandler = async (
  err: WebError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ERROR_CODE = !(err instanceof WebError) ? 500 : err.statusCode;

  console.error(err);

  return res.status(ERROR_CODE).json(
    createResponse(err.name, null, {
      code: err.errorCode,
      message: err.message,
    })
  );
};
