import { PasswordValidationService } from "../../../../../src/shared/security/password/PasswordValidationService";

describe("password service tests", () => {
  const validPassword = "VeryStr0ngP@ssword!";

  it("password with 8 or more characters, is valid", () => {
    const valid =
      PasswordValidationService.verifyMinimumSizeOfPassword(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password with 8 or less characters is invalid", () => {
    const passwordWithoutMinimumCharacters = "1234567";

    const valid = PasswordValidationService.verifyMinimumSizeOfPassword(
      passwordWithoutMinimumCharacters
    );

    expect(valid).toBeFalsy();
  });

  it("blank password is invalid", () => {
    const passwordWithoutMinimumCharacters = "";

    const valid = PasswordValidationService.verifyMinimumSizeOfPassword(
      passwordWithoutMinimumCharacters
    );

    expect(valid).toBeFalsy();
  });

  it("password with numbers is valid", () => {
    const valid =
      PasswordValidationService.verifyNumberInPassword(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password without numbers is invalid", () => {
    const passwordWithoutNumber = "VeryStrongP@ssword!";

    const valid = PasswordValidationService.verifyNumberInPassword(
      passwordWithoutNumber
    );

    expect(valid).toBeFalsy();
  });

  it("password with uppercase letter is valid", () => {
    const valid =
      PasswordValidationService.verifyUppercaseLetter(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password without uppercase letter is invalid", () => {
    const passwordWithoutNumber = "verystr0ngp@ssword!";

    const valid = PasswordValidationService.verifyUppercaseLetter(
      passwordWithoutNumber
    );

    expect(valid).toBeFalsy();
  });

  it("password with lowercase letter is valid", () => {
    const valid =
      PasswordValidationService.verifyLowercaseLetter(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password without lowercase letter is invalid", () => {
    const passwordWithoutNumber = "VERYSTR0NG@SSWORD!";

    const valid = PasswordValidationService.verifyLowercaseLetter(
      passwordWithoutNumber
    );

    expect(valid).toBeFalsy();
  });

  it("password with special character is valid", () => {
    const valid =
      PasswordValidationService.verifySpecialCharacter(validPassword);

    expect(valid).toBeTruthy();
  });

  it("password without special character is invalid", () => {
    const passwordWithoutNumber = "VeryStr0ngPassword";

    const valid = PasswordValidationService.verifySpecialCharacter(
      passwordWithoutNumber
    );

    expect(valid).toBeFalsy();
  });
});
