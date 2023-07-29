import { PasswordService } from "../../../../../src/shared/security/password/PasswordService";

describe("password service tests", () => {
  const validPassword = "VeryStr0ngP@ssword!";

  it("password with 8 or more characters, is valid", () => {
    const valid = PasswordService.verifyMinimumSizeOfPassword(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password with 8 or less characters is invalid", () => {
    const passwordWithoutMinimumCharacters = "1234567";

    const valid = PasswordService.verifyMinimumSizeOfPassword(
      passwordWithoutMinimumCharacters
    );

    expect(valid).toBeFalsy();
  });

  it("blank password is invalid", () => {
    const passwordWithoutMinimumCharacters = "";

    const valid = PasswordService.verifyMinimumSizeOfPassword(
      passwordWithoutMinimumCharacters
    );

    expect(valid).toBeFalsy();
  });

  it("password with numbers is valid", () => {
    const valid = PasswordService.verifyNumberInPassword(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password without numbers is invalid", () => {
    const passwordWithoutNumber = "VeryStrongP@ssword!";

    const valid = PasswordService.verifyNumberInPassword(passwordWithoutNumber);

    expect(valid).toBeFalsy();
  });

  it("password with uppercase letter is valid", () => {
    const valid = PasswordService.verifyUppercaseLetter(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password without uppercase letter is invalid", () => {
    const passwordWithoutNumber = "verystr0ngp@ssword!";

    const valid = PasswordService.verifyUppercaseLetter(passwordWithoutNumber);

    expect(valid).toBeFalsy();
  });

  it("password with lowercase letter is valid", () => {
    const valid = PasswordService.verifyLowercaseLetter(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password without lowercase letter is invalid", () => {
    const passwordWithoutNumber = "VERYSTR0NG@SSWORD!";

    const valid = PasswordService.verifyLowercaseLetter(passwordWithoutNumber);

    expect(valid).toBeFalsy();
  });

  it("password with special character is valid", () => {
    const valid = PasswordService.verifySpecialCharacter(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password without special character is invalid", () => {
    const passwordWithoutNumber = "VeryStr0ngPassword";

    const valid = PasswordService.verifySpecialCharacter(passwordWithoutNumber);

    expect(valid).toBeFalsy();
  });
});
