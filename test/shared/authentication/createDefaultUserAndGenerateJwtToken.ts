import { UserRepository } from "../../../src/modules/accounts/repositories/implementations/typeorm/UserRepository";
import { CreateUserDto } from "../../../src/modules/accounts/useCases/createUser/dto/CreateUserDto";
import { JwtTokenService } from "../../../src/shared/security/jwtToken/JwtTokenService";
import { PasswordService } from "../../../src/shared/security/password/PasswordService";

const createDefaultUserAndGenerateJwtToken = async (): Promise<string> => {
  const userRepository = new UserRepository();
  const passwordService = new PasswordService();

  const user: CreateUserDto = {
    name: "test user",
    email: "testuser@test.com",
    password: passwordService.encryptPassword("TestUserP@assword"),
  };

  const createdUser = await userRepository.createUser(user);

  const jwtTokenService = new JwtTokenService();
  const jwtToken = jwtTokenService.generate(createdUser);

  return jwtToken;
};

export default createDefaultUserAndGenerateJwtToken;
