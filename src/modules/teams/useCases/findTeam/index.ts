import { TeamRepository } from "../../repository/implementations/typeorm/TeamRespository";
import FindTeamController from "./FindTeamController";
import FindTeamUseCase from "./FindTeamUseCase";

const findTeam = (): FindTeamController => {
  const repository = new TeamRepository();
  const useCase = new FindTeamUseCase(repository);
  const controller = new FindTeamController(useCase);

  return controller;
};

export default findTeam();
