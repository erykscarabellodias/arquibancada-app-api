import { ValidationError } from "class-validator";
import { ApplicationError } from "../ApplicationError";

export default class ClassValidatorValidationError extends ApplicationError {
  public validationErrors: FieldError[] = new Array();

  constructor(errors: ValidationError[]) {
    super(
      400,
      "O(s) seguinte(s) problema(s) ocorreu(eram) com sua requisição:"
    );

    errors.map((err) => {
      this.validationErrors.push({
        field: err.property,
        error: this.convertConstraintErrorToSimpleArray(err),
      });
    });
  }

  private convertConstraintErrorToSimpleArray(
    validationError: ValidationError
  ) {
    const constraints = validationError.constraints;
    let messages: string[] = [];

    for (const error in constraints) {
      messages.push(constraints[error]);
    }

    return messages;
  }
}

interface FieldError {
  field: string;
  error: string[];
}
