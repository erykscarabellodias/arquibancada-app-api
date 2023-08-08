import { ApplicationError } from "../../../shared/errors/ApplicationError";

export default class CreateTeamError extends ApplicationError {
  constructor(message: string) {
    super(400, message);
  }
}
