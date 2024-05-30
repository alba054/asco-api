import { WebError } from "./WebError";

export class UnauthenticatedError extends WebError {
  constructor(errorCode: string, message: string) {
    super("UnauthenticatedError", 401, errorCode, message);
  }
}
