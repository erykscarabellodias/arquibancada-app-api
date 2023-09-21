import { UserRepository } from "../../../src/modules/accounts/repositories/implementations/typeorm/UserRepository";
import { TeamRepository } from "../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import { JwtTokenService } from "../../../src/shared/security/jwtToken/JwtTokenService";

const createDefaultUserWithTeamAndGenerateJwtToken =
  async (): Promise<string> => {
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
    });

    await userRepository.chooseTeam(user, team);

    const jwtTokenService = new JwtTokenService();
    const jwtToken = jwtTokenService.generate(user);

    return jwtToken;
  };

export default createDefaultUserWithTeamAndGenerateJwtToken;
