import { ApplicationError } from "../../../../../shared/errors/ApplicationError";

export default class ChooseStadiumError extends ApplicationError {
  constructor(message: string) {
    super(400, message);
  }
}
