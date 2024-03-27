import { User } from "../../../../../../src/modules/accounts/entities/User";
import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import { MatchAlreadyExistsValidator } from "../../../../../../src/modules/matches/registerMatch/validators/MatchAlreadyExistsValidator";
import IMatchRepository from "../../../../../../src/modules/matches/repository/IMatchRepository";
import MatchRepository from "../../../../../../src/modules/matches/repository/implementations/MatchRepository";
import {
  matchDoesNotExistsMock,
  returnMatchMock,
} from "../../../../../mocks/match/matchMocks";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("match already exists tests suit", () => {
  const matchRepository: IMatchRepository = new MatchRepository();

  const matchAlreadyExistsValidator: MatchAlreadyExistsValidator =
    new MatchAlreadyExistsValidator(matchRepository);

  const dto: RegisterMatchInputDto = {
    opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
    stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
    tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
    season: 2016,
    yourTeamGoals: 3,
    opponentGoals: 0,
    scorers: [
      {
        name: "Kadu",
        ownGoal: true,
      },
      {
        name: "Bruno Henrique",
        ownGoal: false,
      },
      {
        name: "Guilherme",
        ownGoal: false,
      },
    ],
    fieldCommand: FieldCommand.HOME,
  };

  const user: User = returnUserWithTeamMock();

  it("should not to be able to register same matches twice", async () => {
    matchRepository.findBySeasonTournamentCommandOpponentAndUser =
      returnMatchMock;

    expect(async () => {
      await matchAlreadyExistsValidator.validate(dto, user);
    }).rejects.toThrow(new RegisterMatchError("Este jogo já foi cadastrado"));
  });

  it("should to be able to register a new match", async () => {
    matchRepository.findBySeasonTournamentCommandOpponentAndUser =
      matchDoesNotExistsMock;

    expect(async () => {
      await matchAlreadyExistsValidator.validate(dto, user);
    }).not.toThrow();
  });
});
