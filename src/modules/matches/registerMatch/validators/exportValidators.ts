import DateUtils from "../../../../shared/utils/DateUtils";
import IPlayerRepository from "../../../players/entites/repository/IPlayerRepository";
import IStadiumRepository from "../../../stadiums/repository/IStadiumRepository";
import { ITeamRepository } from "../../../teams/repository/ITeamRepository";
import ITournamentRepository from "../../../tournament/repository/ITournamentRepository";
import IMatchRepository from "../../repository/IMatchRepository";
import { FieldCommandExistsValidator } from "./FieldCommandExistsValidator";
import { MatchAlreadyExistsValidator } from "./MatchAlreadyExistsValidator";
import MatchDateCantBeInFutureValidator from "./MatchDateCantBeInFutureValidator";
import { NumberOfGoalsValidator } from "./NumberOfGoalsValidator";
import OpponentExistsValidator from "./OpponentExistsValidator";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";
import ScorersExistsValidator from "./ScorersExistsValidator";
import { SeasonCantBeInFutureValidator } from "./SeasonCantBeInFutureValidator";
import { StadiumExistsValidator } from "./StadiumExistsValidator";
import { TournamentExistsValidator } from "./TournamentExistsValidator";
import { UserMustHaveTeamSelectedValidator } from "./UserMustHaveTeamSelectedValidator";
import { UserTeamCantBeTheSameAsTheOpponentValidator } from "./UserTeamCantBeTheSameAsTheOpponentValidator";

const exportValidators = (
  matchRepository: IMatchRepository,
  teamRepository: ITeamRepository,
  playerRepository: IPlayerRepository,
  stadiumRepository: IStadiumRepository,
  tournamentRepository: ITournamentRepository,
  dateUtils: DateUtils
): RegisterMatchValidatorInterface[] => {
  const validators: RegisterMatchValidatorInterface[] = [];

  validators.push(
    new FieldCommandExistsValidator(),
    new MatchAlreadyExistsValidator(matchRepository),
    new NumberOfGoalsValidator(),
    new OpponentExistsValidator(teamRepository),
    new ScorersExistsValidator(playerRepository),
    new SeasonCantBeInFutureValidator(dateUtils),
    new StadiumExistsValidator(stadiumRepository),
    new TournamentExistsValidator(tournamentRepository),
    new UserMustHaveTeamSelectedValidator(),
    new UserTeamCantBeTheSameAsTheOpponentValidator(),
    new MatchDateCantBeInFutureValidator(dateUtils)
  );

  return validators;
};

export default exportValidators;
