import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import OpponentExistsValidator from "../../../../../../src/modules/matches/registerMatch/validators/OpponentExistsValidator";
import { ITeamRepository } from "../../../../../../src/modules/teams/repository/ITeamRepository";
import { TeamRepository } from "../../../../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import {
  returnTeamMock,
  teamDoesNotExist,
} from "../../../../../mocks/teams/teamsMocks";

describe("opponent exists integration validator", () => {
  const teamRepository: ITeamRepository = new TeamRepository();
  const opponentExistsValidator: OpponentExistsValidator =
    new OpponentExistsValidator(teamRepository);

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

  it("should not to be able to select a non existent opponent", () => {
    teamRepository.findById = teamDoesNotExist;

    expect(async () => {
      await opponentExistsValidator.validate(dto);
    }).rejects.toThrow(
      new RegisterMatchError("O adversário não está cadastrado na plataforma")
    );
  });

  it("should be able to select an existent opponent", async () => {
    teamRepository.findById = returnTeamMock;

    await opponentExistsValidator.validate(dto);

    expect(teamRepository.findById).toHaveBeenCalledTimes(1);
  });
});
