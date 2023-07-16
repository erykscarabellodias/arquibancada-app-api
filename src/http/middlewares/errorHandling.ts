import { NextFunction, Request, Response } from "express";
import ClassValidatorValidationError from "../../shared/errors/classValidator/ClassValidatorValidationError";
import { ApplicationError } from "../../shared/errors/ApplicationError";

const errorHandling = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ClassValidatorValidationError) {
    return response
      .status(error.httpStatusCode)
      .json({ message: error.message, errors: error.validationErrors });
  }

  if (error instanceof ApplicationError) {
    return response
      .status(error.httpStatusCode)
      .json({ message: error.message });
  }

  if (error) {
    console.log(error);

    return response.status(500).json({
      message:
        "Houve um erro inesperado, tente novamente. Caso se o erro persista, entre em contato com o administrador",
    });
  }

  next(error);
};

export { errorHandling };
