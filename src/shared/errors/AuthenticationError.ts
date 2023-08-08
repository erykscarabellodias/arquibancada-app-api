import { ApplicationError } from "./ApplicationError";

export class AuthenticationError extends ApplicationError {
  constructor(message: string) {
    super(401, message);
  }
}
