import { ApplicationError } from "../../../shared/errors/ApplicationError";

export class CreatePlayerError extends ApplicationError {
  constructor(message: string) {
    super(400, message);
  }
}
