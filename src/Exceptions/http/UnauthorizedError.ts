import { WebError } from "./WebError";

export class UnauthorizedError extends WebError {
  constructor(errorCode: string, message: string) {
    super("UnauthorizedError", 403, errorCode, message);
  }
}
