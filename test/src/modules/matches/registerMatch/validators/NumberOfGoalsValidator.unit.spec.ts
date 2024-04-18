import { User } from "../../../../../../src/modules/accounts/entities/User";
import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import { NumberOfGoalsValidator } from "../../../../../../src/modules/matches/registerMatch/validators/NumberOfGoalsValidator";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("number of goals validator suit tests", () => {
  const numberOfGoalsValidator: NumberOfGoalsValidator =
    new NumberOfGoalsValidator();

  let dto: RegisterMatchInputDto = {
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

  const user = returnUserWithTeamMock();

  it("should not to be able to register a match with more goals than scorers", async () => {
    dto.yourTeamGoals = 5;

    expect(async () => {
      await numberOfGoalsValidator.validate(dto, user);
    }).rejects.toThrow(
      new RegisterMatchError(
        "O número de gols do seu time o número de marcadores não são compatíveis"
      )
    );
  });

  it("should not to be able to register a match with less goals than scorers", async () => {
    dto.yourTeamGoals = 2;

    expect(async () => {
      await numberOfGoalsValidator.validate(dto, user);
    }).rejects.toThrow(
      new RegisterMatchError(
        "O número de gols do seu time o número de marcadores não são compatíveis"
      )
    );
  });

  it("should to be able to register a match with same number of goals and scorers", async () => {
    dto.yourTeamGoals = 3;

    expect(async () => {
      await numberOfGoalsValidator.validate(dto, user);
    }).not.toThrow();
  });
});
