import { User } from "../../../src/modules/accounts/entities/User";
import { UserRepository } from "../../../src/modules/accounts/repositories/implementations/typeorm/UserRepository";
import { CreateUserDto } from "../../../src/modules/accounts/useCases/createUser/dto/CreateUserDto";
import { JwtTokenService } from "../../../src/shared/security/jwtToken/JwtTokenService";
import { PasswordService } from "../../../src/shared/security/password/PasswordService";

interface CreatedUserReturnDto {
  user: User;
  jwtToken: string;
}

const createDefaultUserAndGenerateJwtToken =
  async (): Promise<CreatedUserReturnDto> => {
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

    return { user: createdUser, jwtToken };
  };

export default createDefaultUserAndGenerateJwtToken;
