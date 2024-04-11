import { User } from "../../../../../../src/modules/accounts/entities/User";
import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import { FieldCommandExistsValidator } from "../../../../../../src/modules/matches/registerMatch/validators/FieldCommandExistsValidator";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("field command exists validator unit tests suit", () => {
  const fieldCommandExistsValidator: FieldCommandExistsValidator =
    new FieldCommandExistsValidator();

  let dto: RegisterMatchInputDto = {
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

  const user: User = returnUserWithTeamMock();

  it("should not to be able to use a field command that does not exists", () => {
    dto.fieldCommand = "NONEXISTENT" as FieldCommand;

    expect(async () => {
      await fieldCommandExistsValidator.validate(dto, user);
    }).rejects.toThrow(
      new RegisterMatchError("O tipo de mando de campo enviado não existe")
    );
  });

  it("should to be able to use a field command AWAY", () => {
    dto.fieldCommand = FieldCommand.AWAY;

    expect(async () => {
      await fieldCommandExistsValidator.validate(dto, user);
    }).not.toThrow();
  });

  it("should to be able to use a field command HOME", () => {
    dto.fieldCommand = FieldCommand.HOME;

    expect(async () => {
      await fieldCommandExistsValidator.validate(dto, user);
    }).not.toThrow();
  });

  it("should to be able to use a field command NEUTRAL", () => {
    dto.fieldCommand = FieldCommand.NEUTRAL;

    expect(async () => {
      await fieldCommandExistsValidator.validate(dto, user);
    }).not.toThrow();
  });
});
