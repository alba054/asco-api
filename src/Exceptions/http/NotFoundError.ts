import { WebError } from "./WebError";

export class NotFoundError extends WebError {
  constructor(errorCode: string, message: string) {
    super("NotFoundError", 404, errorCode, message);
  }
}
