import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { PasswordValidationService } from "./PasswordValidationService";

@ValidatorConstraint({ name: "securePassword", async: true })
export class SecurePasswordValidator implements ValidatorConstraintInterface {
  validate(
    password: string,
    validationArguments?: ValidationArguments | undefined
  ): boolean | Promise<boolean> {
    if (
      !PasswordValidationService.verifyMinimumSizeOfPassword(password) ||
      !PasswordValidationService.verifyNumberInPassword(password) ||
      !PasswordValidationService.verifyUppercaseLetter(password) ||
      !PasswordValidationService.verifyLowercaseLetter(password) ||
      !PasswordValidationService.verifySpecialCharacter(password)
    ) {
      return false;
    }
    return true;
  }
  defaultMessage?(
    validationArguments?: ValidationArguments | undefined
  ): string {
    return "A sua senha deve conter ao menos 8 caracteres, letras maiúsculas e minúsculas, um número e um caractere especial (!, #, @, $, %, & ou *)";
  }
}
