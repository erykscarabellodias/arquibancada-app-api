import { User } from "../../../../../../src/modules/accounts/entities/User";
import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import { UserMustHaveTeamSelectedValidator } from "../../../../../../src/modules/matches/registerMatch/validators/UserMustHaveTeamSelectedValidator";
import {
  returnUserMock,
  returnUserWithTeamMock,
} from "../../../../../mocks/user/userMocks";

describe("user must have team selected unit tests suit", () => {
  const userHaveATeam: UserMustHaveTeamSelectedValidator =
    new UserMustHaveTeamSelectedValidator();

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

  it("should not to be able to create a match if user doesnt have a team", async () => {
    const userWithATeam: User = returnUserMock();

    expect(async () => {
      await userHaveATeam.validate(dto, userWithATeam);
    }).rejects.toThrow(
      new RegisterMatchError("O usuário ainda não selecionou um time")
    );
  });

  it("should to be able to create a match if user have a team", async () => {
    const userWithATeam: User = returnUserWithTeamMock();

    expect(async () => {
      await userHaveATeam.validate(dto, userWithATeam);
    }).not.toThrow();
  });
});
