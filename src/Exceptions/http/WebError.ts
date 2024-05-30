export class WebError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(
    name: string,
    statusCode: number,
    errorCode: string,
    message: string
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
