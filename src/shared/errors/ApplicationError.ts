export class ApplicationError extends Error {
  public httpStatusCode: number;

  constructor(httpStatusCode: number, message: string) {
    super(message);

    this.httpStatusCode = httpStatusCode;
  }
}
