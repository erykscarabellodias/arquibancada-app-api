import { TeamRepository } from "../../../teams/repository/implementations/typeorm/TeamRespository";
import { UserRepository } from "../../repositories/implementations/typeorm/UserRepository";
import ChooseTeamController from "./ChooseTeamController";
import ChooseTeamUseCase from "./ChooseTeamUseCase";

const chooseTeam = (): ChooseTeamController => {
  const teamRepository = new TeamRepository();
  const userRepository = new UserRepository();

  const chooseTeamUseCase = new ChooseTeamUseCase(
    teamRepository,
    userRepository
  );

  const controller = new ChooseTeamController(chooseTeamUseCase);

  return controller;
};

export default chooseTeam();
