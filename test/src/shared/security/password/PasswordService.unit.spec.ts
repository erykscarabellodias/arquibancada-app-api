import { PasswordService } from "../../../../../src/shared/security/password/PasswordService";

describe("password service tests suit", () => {
  const passwordService = new PasswordService();

  it("should to be able to validate an encrypted correct password", () => {
    const password = "Str0ngP@ssw0rd";

    const encryptedPassword = passwordService.encryptPassword(password);
    const passwordIsValid = passwordService.checkPassword(
      password,
      encryptedPassword
    );

    expect(passwordIsValid).toBeTruthy();
  });

  it("should not to be able to validate an encrypted correct password", () => {
    const password = "Str0ngP@ssw0rd";
    const incorrectPassword = "StrongPassword";

    const encryptedPassword = passwordService.encryptPassword(password);
    const passwordIsValid = passwordService.checkPassword(
      incorrectPassword,
      encryptedPassword
    );

    expect(passwordIsValid).toBeFalsy();
  });
});
