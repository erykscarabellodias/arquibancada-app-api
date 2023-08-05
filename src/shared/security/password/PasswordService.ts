import bcrypt from "bcrypt";

export class PasswordService {
  public encryptPassword(plainText: string): string {
    return bcrypt.hashSync(plainText, 10);
  }

  public checkPassword(
    plainPassword: string,
    encryptedPassword: string
  ): boolean {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  }
}
