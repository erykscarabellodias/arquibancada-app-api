import { UserRepository } from "../../../../../../src/modules/accounts/repositories/implementations/typeorm/UserRepository";
import AuthUseCase from "../../../../../../src/modules/accounts/useCases/auth/AuthUseCase";
import { AuthInputDto } from "../../../../../../src/modules/accounts/useCases/auth/dto/AuthInputDto";
import { AuthError } from "../../../../../../src/modules/accounts/useCases/auth/errors/AuthError";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import { JwtTokenService } from "../../../../../../src/shared/security/jwtToken/JwtTokenService";
import { PasswordService } from "../../../../../../src/shared/security/password/PasswordService";
import {
  inexistentUser,
  returnUserMock,
} from "../../../../../mocks/user/userMocks";

describe("auth use case tests suit", () => {
  const validPasswordMock = jest.fn().mockReturnValue(true);
  const invalidPasswordMock = jest.fn().mockReturnValue(false);
  const jwtToken = jest
    .fn()
    .mockReturnValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNjc2N2E2MC1jZGM1LTQ4MWYtYjQ0MC1hNGJhNTY4ZWQ3NDEiLCJuYW1lIjoiVGVzdCB1c2VyIiwiaWF0IjoxNjkxMTkzNTEyLCJleHAiOjE2OTExOTcxMTJ9.Yful0_GoGH2ShXjGiWy3vyhSWmpPmKoC-LuoWchhwhA"
    );

  const userRepository = new UserRepository();
  const passwordService = new PasswordService();
  const jwtTokenService = new JwtTokenService();

  const authUseCase = new AuthUseCase(
    userRepository,
    passwordService,
    jwtTokenService
  );

  beforeAll(() => {
    jwtTokenService.generate = jwtToken;
  });

  it("should be able to return a jwt token to a authenticated user", async () => {
    userRepository.findByEmail = returnUserMock;
    passwordService.checkPassword = validPasswordMock;

    const authDto: AuthInputDto = {
      email: "testmail@gmail.com",
      password: "VeryStr0ngP@assword!",
    };

    const token = await authUseCase.execute(authDto);

    expect(token).toHaveProperty("name");
    expect(token).toHaveProperty("email");
    expect(token).toHaveProperty("token");
  });

  it("should not to be able to generate a token to a inexistent user", async () => {
    userRepository.findByEmail = inexistentUser;

    const authDto: AuthInputDto = {
      email: "testmail@gmail.com",
      password: "VeryStr0ngP@assword!",
    };

    expect(async () => {
      await authUseCase.execute(authDto);
    }).rejects.toThrow(new AuthError("Este usuário não existe"));
  });

  it("should not to be able to generate a token to a user with wrong password", async () => {
    userRepository.findByEmail = returnUserMock;
    passwordService.checkPassword = invalidPasswordMock;

    const authDto: AuthInputDto = {
      email: "testmail@gmail.com",
      password: "VeryStr0ngP@assword!",
    };

    expect(async () => {
      await authUseCase.execute(authDto);
    }).rejects.toThrow(new AuthError("Senha incorreta"));
  });

  it("should not be able to authenticate with an invalid email", () => {
    userRepository.findByEmail = returnUserMock;
    passwordService.checkPassword = validPasswordMock;

    const authDto: AuthInputDto = {
      email: "invalidmail",
      password: "VeryStr0ngP@assword!",
    };

    expect(async () => {
      await authUseCase.execute(authDto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });

  test.each([
    [
      {
        email: "",
        password: "VeryStr0ngP@assword!",
      },
      {
        email: "testmail@gmail.com",
        password: "",
      },
    ],
  ])(
    "should not to be able to authenticate without email or password",
    (param) => {
      expect(async () => {
        await authUseCase.execute(param);
      }).rejects.toThrow(ClassValidatorValidationError);
    }
  );
});
