import { Team } from "../../../src/modules/teams/entities/Team";
import { TeamRepository } from "../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import CreateTeamInputDto from "../../../src/modules/teams/useCases/createTeam/dto/CreateTeamInputDto";

const createTeams = async (): Promise<Team> => {
  const teamRepository = new TeamRepository();

  const corinthians: CreateTeamInputDto = {
    complete_name: "Sport Club Corinthians Paulista",
    nickname: "Corinthians",
    city: "São Paulo",
    state: "São Paulo",
  };

  const coritiba: CreateTeamInputDto = {
    complete_name: "Coritiba Foot Ball Club",
    nickname: "Coritiba",
    city: "Curitiba",
    state: "Paraná",
  };

  const createdCorinthians = await teamRepository.create(corinthians);
  await teamRepository.create(coritiba);

  return createdCorinthians;
};

export default createTeams;
