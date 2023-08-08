import { TeamRepository } from "../../repository/implementations/typeorm/TeamRespository";
import CreateTeamController from "./CreateTeamController";
import { CreateTeamUseCase } from "./CreateTeamUseCase";

const createTeam = (): CreateTeamController => {
  const repository = new TeamRepository();
  const useCase = new CreateTeamUseCase(repository);
  const controller = new CreateTeamController(useCase);

  return controller;
};

export default createTeam();
