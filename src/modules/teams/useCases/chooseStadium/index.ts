import CheckIfUserHaveATeamService from "../../../accounts/services/CheckIfUserHaveATeam.service";
import StadiumRepository from "../../../stadiums/repository/implementations/typeorm/StadiumRepository";
import CheckIfUserTeamHaveAStadiumService from "../../../stadiums/services/CheckIfUserTeamHaveAStadium.service";
import { TeamRepository } from "../../repository/implementations/typeorm/TeamRespository";
import ChooseStadiumController from "./ChooseStadiumController";
import ChooseStadiumUseCase from "./ChooseStadiumUseCase";

const chooseStadium = (): ChooseStadiumController => {
  const teamRepository = new TeamRepository();

  const stadiumRepository = new StadiumRepository();

  const checkIfUserHaveATeamService = new CheckIfUserHaveATeamService();

  const checkIfUserTeamHaveAStadiumService =
    new CheckIfUserTeamHaveAStadiumService();

  const chooseStadiumUseCase = new ChooseStadiumUseCase(
    teamRepository,
    stadiumRepository,
    checkIfUserHaveATeamService,
    checkIfUserTeamHaveAStadiumService
  );

  const chooseStadiumController = new ChooseStadiumController(
    chooseStadiumUseCase
  );

  return chooseStadiumController;
};

export default chooseStadium();
