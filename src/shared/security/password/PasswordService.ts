import bcrypt from "bcrypt";

export class PasswordService {
  public static encryptPassword(plainText: string): string {
    return bcrypt.hashSync(plainText, 10);
  }

  public static verifyMinimumSizeOfPassword(password: string): boolean {
    if (password.length < 8) {
      return false;
    }

    return true;
  }

  public static verifyNumberInPassword(password: string): boolean {
    const regexNumber = /[0-9]/;

    if (regexNumber.test(password)) {
      return true;
    }

    return false;
  }

  public static verifyUppercaseLetter(password: string): boolean {
    const regexUppercaseLetter = /[A-Z]/;

    if (regexUppercaseLetter.test(password)) {
      return true;
    }

    return false;
  }

  public static verifyLowercaseLetter(password: string): boolean {
    const regexLowercaseLetter = /[a-z]/;

    if (regexLowercaseLetter.test(password)) {
      return true;
    }

    return false;
  }

  public static verifySpecialCharacter(password: string): boolean {
    const regexSpecialCharacter = /[!#@$%&*]/;

    if (regexSpecialCharacter.test(password)) {
      return true;
    }

    return false;
  }
}
