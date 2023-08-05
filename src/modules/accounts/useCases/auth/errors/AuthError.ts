import { ApplicationError } from "../../../../../shared/errors/ApplicationError";

export class AuthError extends ApplicationError {
  public constructor(message: string) {
    super(401, message);
  }
}
