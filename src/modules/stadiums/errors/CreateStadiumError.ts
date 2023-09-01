import { ApplicationError } from "../../../shared/errors/ApplicationError";

export default class CreateStadiumError extends ApplicationError {
  constructor(message: string) {
    super(400, message);
  }
}
