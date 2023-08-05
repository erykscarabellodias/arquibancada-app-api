import { JwtTokenService } from "../../../../shared/security/jwtToken/JwtTokenService";
import { PasswordService } from "../../../../shared/security/password/PasswordService";
import { UserRepository } from "../../repositories/implementations/typeorm/UserRepository";
import { AuthController } from "./AuthController";
import AuthUseCase from "./AuthUseCase";

const authController = (): AuthController => {
  const passwordService = new PasswordService();
  const jwtTokenService = new JwtTokenService();
  const userRepository = new UserRepository();

  const authUseCase = new AuthUseCase(
    userRepository,
    passwordService,
    jwtTokenService
  );

  const controller = new AuthController(authUseCase);

  return controller;
};

export default authController();
