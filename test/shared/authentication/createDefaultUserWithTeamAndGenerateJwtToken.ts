import { User } from "../../../src/modules/accounts/entities/User";
import { UserRepository } from "../../../src/modules/accounts/repositories/implementations/typeorm/UserRepository";
import { TeamRepository } from "../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import { JwtTokenService } from "../../../src/shared/security/jwtToken/JwtTokenService";

interface CreatedUserReturnDto {
  user: User;
  jwtToken: string;
}

const createDefaultUserWithTeamAndGenerateJwtToken =
  async (): Promise<CreatedUserReturnDto> => {
    const teamRepository = new TeamRepository();
    const userRepository = new UserRepository();

    const user = await userRepository.createUser({
      name: "test",
      email: "usertest@test.com",
      password: "test@Password",
    });

    const team = await teamRepository.create({
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      city: "São Paulo",
      state: "São Paulo",
      isForeigner: false,
    });

    const createdUser = await userRepository.chooseTeam(user, team);

    const jwtTokenService = new JwtTokenService();
    const jwtToken = jwtTokenService.generate(user);

    return { user: createdUser, jwtToken };
  };

export default createDefaultUserWithTeamAndGenerateJwtToken;
