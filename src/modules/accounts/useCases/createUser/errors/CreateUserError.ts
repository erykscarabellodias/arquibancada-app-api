import { ApplicationError } from "../../../../../shared/errors/ApplicationError";

export class CreateUserError extends ApplicationError {
  public constructor(message: string) {
    super(400, message);
  }
}
