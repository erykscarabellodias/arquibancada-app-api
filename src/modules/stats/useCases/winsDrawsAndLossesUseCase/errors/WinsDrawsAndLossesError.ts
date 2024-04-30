import { ApplicationError } from "../../../../../shared/errors/ApplicationError";

export default class WinsDrawsAndLossesError extends ApplicationError {
  constructor(message: string) {
    super(400, message);
  }
}
