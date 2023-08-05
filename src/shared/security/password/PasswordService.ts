import bcrypt from "bcrypt";

export class PasswordService {
  public encryptPassword(plainText: string): string {
    return bcrypt.hashSync(plainText, 10);
  }
}
