import { WebError } from "./WebError";

export class InternalServerError extends WebError {
  constructor(errorCode: string, message: string = "Internal Error :(") {
    super("InternalServerError", 500, errorCode, message);
  }
}
