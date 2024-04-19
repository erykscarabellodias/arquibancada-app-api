import DateUtils from "../../../shared/utils/DateUtils";
import IPlayerRepository from "../../players/entites/repository/IPlayerRepository";
import PlayerRepository from "../../players/entites/repository/implementations/PlayerRepository";
import StadiumRepository from "../../stadiums/repository/implementations/typeorm/StadiumRepository";
import { TeamRepository } from "../../teams/repository/implementations/typeorm/TeamRespository";
import TournamentRepository from "../../tournament/repository/implementations/typeorm/TournamentRepository";
import MatchRepository from "../repository/implementations/MatchRepository";
import MatchScorerRepository from "../repository/implementations/MatchScorerRepository";
import MatchResult from "../services/MatchResult";
import RegisterMatchController from "./RegisterMatchController";
import RegisterMatchUseCase from "./RegisterMatchUseCase";
import RegisterMatchValidatorInterface from "./validators/RegisterMatchValidatorInterface";
import exportValidators from "./validators/exportValidators";

const registerMatch = (): RegisterMatchController => {
  const matchRepository = new MatchRepository();
  const teamRepository = new TeamRepository();
  const playerRepository = new PlayerRepository();
  const stadiumRepository = new StadiumRepository();
  const tournamentRepository = new TournamentRepository();
  const matchScorerRepository = new MatchScorerRepository();
  const matchResult = new MatchResult();
  const dateUtils = new DateUtils();

  const validators: RegisterMatchValidatorInterface[] = exportValidators(
    matchRepository,
    teamRepository,
    playerRepository,
    stadiumRepository,
    tournamentRepository,
    dateUtils
  );

  const useCase: RegisterMatchUseCase = new RegisterMatchUseCase(
    validators,
    matchRepository,
    teamRepository,
    tournamentRepository,
    stadiumRepository,
    playerRepository,
    matchScorerRepository,
    matchResult
  );

  const controller: RegisterMatchController = new RegisterMatchController(
    useCase
  );

  return controller;
};

export default registerMatch();
