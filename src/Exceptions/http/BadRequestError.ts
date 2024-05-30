import { WebError } from "./WebError";

export class BadRequestError extends WebError {
  constructor(errorCode: string, message: string) {
    super("BadRequestError", 400, errorCode, message);
  }
}
