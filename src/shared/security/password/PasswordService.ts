import bcrypt from "bcrypt";

export class PasswordService {
  public static encryptPassword(plainText: string): string {
    return bcrypt.hashSync(plainText, 10);
  }
}
