import { User } from "../../../../../../src/modules/accounts/entities/User";
import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import ScorersExistsValidator from "../../../../../../src/modules/matches/registerMatch/validators/ScorersExistsValidator";
import IPlayerRepository from "../../../../../../src/modules/players/entites/repository/IPlayerRepository";
import PlayerRepository from "../../../../../../src/modules/players/entites/repository/implementations/PlayerRepository";
import {
  playerDontExistsMock,
  playerMock,
} from "../../../../../mocks/player/playerMocks";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("scorers exists unit tests suit", () => {
  const repository: IPlayerRepository = new PlayerRepository();
  const validator = new ScorersExistsValidator(repository);

  const user: User = returnUserWithTeamMock();

  it("should not be able to create a match with a player that do not exists", async () => {
    repository.findById = playerDontExistsMock;

    const dto: RegisterMatchInputDto = {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
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

    expect(async () => {
      await validator.validate(dto, user);
    }).rejects.toThrow(
      new RegisterMatchError("Algum jogador enviado não está cadastrado")
    );
  });

  it("should be able to create a match with a player that exists", async () => {
    repository.findById = playerMock;

    const dto: RegisterMatchInputDto = {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
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

    expect(async () => {
      await validator.validate(dto, user);
    }).not.toThrow();
  });

  it("should be able to create a match without players", async () => {
    const dto: RegisterMatchInputDto = {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    };

    expect(async () => {
      await validator.validate(dto, user);
    }).not.toThrow();
  });
});
