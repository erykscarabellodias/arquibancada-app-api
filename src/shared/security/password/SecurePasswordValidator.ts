import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { PasswordService } from "./PasswordService";

@ValidatorConstraint({ name: "securePassword", async: true })
export class SecurePasswordValidator implements ValidatorConstraintInterface {
  validate(
    password: string,
    validationArguments?: ValidationArguments | undefined
  ): boolean | Promise<boolean> {
    if (
      !PasswordService.verifyMinimumSizeOfPassword(password) ||
      !PasswordService.verifyNumberInPassword(password) ||
      !PasswordService.verifyUppercaseLetter(password) ||
      !PasswordService.verifyLowercaseLetter(password) ||
      !PasswordService.verifySpecialCharacter(password)
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
