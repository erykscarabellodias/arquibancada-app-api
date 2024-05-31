import { Team } from "../../../src/modules/teams/entities/Team";
import { TeamRepository } from "../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import CreateTeamInputDto from "../../../src/modules/teams/useCases/createTeam/dto/CreateTeamInputDto";

const createTeams = async (): Promise<Team[]> => {
  const teamRepository = new TeamRepository();

  const corinthians: CreateTeamInputDto = {
    complete_name: "Sport Club Corinthians Paulista",
    nickname: "Corinthians",
    city: "São Paulo",
    state: "São Paulo",
    isForeigner: false,
  };

  const coritiba: CreateTeamInputDto = {
    complete_name: "Coritiba Foot Ball Club",
    nickname: "Coritiba",
    city: "Curitiba",
    state: "Paraná",
    isForeigner: false,
  };

  const figueirense: CreateTeamInputDto = {
    complete_name: "Figueirense Futebol Clube",
    nickname: "Figueirense",
    city: "Florianópolis",
    state: "Santa Catarina",
    isForeigner: false,
  };

  const redBull: CreateTeamInputDto = {
    complete_name: "Red Bull Bragantino",
    nickname: "Red Bull Bragantino",
    city: "Bragança Paulista",
    state: "São Paulo",
    isForeigner: false,
  };

  const createdCorinthians = await teamRepository.create(corinthians);
  const createdCoritiba = await teamRepository.create(coritiba);
  const createdFigueirense = await teamRepository.create(figueirense);
  const createdRedBull = await teamRepository.create(redBull);

  return [
    createdCorinthians,
    createdCoritiba,
    createdFigueirense,
    createdRedBull,
  ];
};

export default createTeams;
