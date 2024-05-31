import RegisterMatchUseCase from "../../../../../src/modules/matches/registerMatch/RegisterMatchUseCase";
import RegisterMatchInputDto from "../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchValidatorInterface from "../../../../../src/modules/matches/registerMatch/validators/RegisterMatchValidatorInterface";
import MatchRepository from "../../../../../src/modules/matches/repository/implementations/MatchRepository";
import MatchScorerRepository from "../../../../../src/modules/matches/repository/implementations/MatchScorerRepository";
import MatchResult from "../../../../../src/modules/matches/services/MatchResult";
import PlayerRepository from "../../../../../src/modules/players/entites/repository/implementations/PlayerRepository";
import StadiumRepository from "../../../../../src/modules/stadiums/repository/implementations/typeorm/StadiumRepository";
import { TeamRepository } from "../../../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import TournamentRepository from "../../../../../src/modules/tournament/repository/implementations/typeorm/TournamentRepository";
import { returnMatchMock } from "../../../../mocks/match/matchMocks";
import { matchScorerRegistered } from "../../../../mocks/matchScorers/matchScorersMock";
import { playerMock } from "../../../../mocks/player/playerMocks";
import { createdStadiumMock } from "../../../../mocks/stadium/stadiumMocks";
import { returnNationalTeamMock } from "../../../../mocks/teams/teamsMocks";
import { createdTournament } from "../../../../mocks/tournament/tournamentMocks";
import { returnUserWithTeamMock } from "../../../../mocks/user/userMocks";

describe("register match use case unit tests suit", () => {
  const matchRepository = new MatchRepository();
  const teamRepository = new TeamRepository();
  const playerRepository = new PlayerRepository();
  const stadiumRepository = new StadiumRepository();
  const tournamentRepository = new TournamentRepository();
  const matchScorerRepository = new MatchScorerRepository();
  const matchResult = new MatchResult();

  const validators: RegisterMatchValidatorInterface[] = [];

  const useCase = new RegisterMatchUseCase(
    validators,
    matchRepository,
    teamRepository,
    tournamentRepository,
    stadiumRepository,
    playerRepository,
    matchScorerRepository,
    matchResult
  );

  const user = returnUserWithTeamMock();

  it("should be able to register a match without scorers", async () => {
    matchRepository.create = returnMatchMock;
    playerRepository.findById = playerMock;
    teamRepository.findById = returnNationalTeamMock;
    tournamentRepository.findById = createdTournament;
    stadiumRepository.findById = createdStadiumMock;
    teamRepository.findById = returnNationalTeamMock;
    matchScorerRepository.registerMatchScorer = matchScorerRegistered;

    const otherDto: RegisterMatchInputDto = {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 0,
      opponentGoals: 0,
      date: new Date("2016-05-16"),
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    };

    await useCase.execute(otherDto, user);

    expect(matchRepository.create).toBeCalled();
    expect(matchScorerRepository.registerMatchScorer).toBeCalledTimes(0);
  });

  it("should to be able to register a match", async () => {
    matchRepository.create = returnMatchMock;
    playerRepository.findById = playerMock;
    teamRepository.findById = returnNationalTeamMock;
    tournamentRepository.findById = createdTournament;
    stadiumRepository.findById = createdStadiumMock;
    teamRepository.findById = returnNationalTeamMock;
    matchScorerRepository.registerMatchScorer = matchScorerRegistered;

    const dto: RegisterMatchInputDto = {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
      date: new Date("2016-05-16"),
      scorers: [
        {
          id: "d6ec1850-f2de-410a-8860-96c6028f1f59",
          ownGoal: true,
        },
        {
          id: "2c598381-164c-4478-819e-0909eeb00a46",
          ownGoal: false,
        },
        {
          id: "56d1488e-638d-4bb3-9f2d-289a0bdc7acb",
          ownGoal: false,
        },
      ],
      fieldCommand: FieldCommand.HOME,
    };

    await useCase.execute(dto, user);

    expect(matchRepository.create).toBeCalled();
    expect(matchScorerRepository.registerMatchScorer).toBeCalledTimes(3);
  });
});
