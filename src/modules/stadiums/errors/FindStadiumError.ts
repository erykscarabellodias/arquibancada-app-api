import { ApplicationError } from "../../../shared/errors/ApplicationError";

export default class FindStadiumError extends ApplicationError {
  constructor(message: string) {
    super(400, message);
  }
}
