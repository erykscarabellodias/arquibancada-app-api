import { User } from "../../../../../../src/modules/accounts/entities/User";
import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import { UserTeamCantBeTheSameAsTheOpponentValidator } from "../../../../../../src/modules/matches/registerMatch/validators/UserTeamCantBeTheSameAsTheOpponentValidator";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("user team cannot be the same as the opponent unit tests suit", () => {
  const user: User = returnUserWithTeamMock();

  const validator: UserTeamCantBeTheSameAsTheOpponentValidator =
    new UserTeamCantBeTheSameAsTheOpponentValidator();

  it("the teams id cannot be the same", async () => {
    const dto: RegisterMatchInputDto = {
      opponentId: "f3472988-da25-4315-b01d-ba604bf5b3a9",
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

    expect(async () => {
      await validator.validate(dto, user);
    }).rejects.toThrow(
      new RegisterMatchError(
        "O time do usuário não pode ser o mesmo do adversário"
      )
    );
  });

  it("the teams id are different", async () => {
    const dto: RegisterMatchInputDto = {
      opponentId: "cc9d7603-5d4b-481b-aa10-d2ab3f84c69b",
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

    expect(async () => {
      await validator.validate(dto, user);
    }).not.toThrow();
  });
});
