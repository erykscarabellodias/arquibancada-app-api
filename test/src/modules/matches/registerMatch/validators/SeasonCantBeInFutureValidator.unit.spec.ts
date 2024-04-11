import { User } from "../../../../../../src/modules/accounts/entities/User";
import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import { SeasonCantBeInFutureValidator } from "../../../../../../src/modules/matches/registerMatch/validators/SeasonCantBeInFutureValidator";
import DateUtils from "../../../../../../src/shared/utils/DateUtils";
import {
  exactYearMock,
  futureYearMock,
  pastYearMock,
} from "../../../../../mocks/dateUtils/dateUtilMocks";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("user must have team selected unit tests suit", () => {
  const dateUtils: DateUtils = new DateUtils();

  const seasonYearValidator: SeasonCantBeInFutureValidator =
    new SeasonCantBeInFutureValidator(dateUtils);

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

  const user: User = returnUserWithTeamMock();

  it("should not to be able to create a match if season is in the future", async () => {
    dateUtils.getYear = pastYearMock;
    expect(async () => {
      await seasonYearValidator.validate(dto, user);
    }).rejects.toThrow(
      new RegisterMatchError(
        "A temporada da partida não pode ser maior que a atual"
      )
    );
  });

  it("should to be able to create a match if season is in the past", async () => {
    dateUtils.getYear = futureYearMock;

    expect(async () => {
      await seasonYearValidator.validate(dto, user);
    }).not.toThrow();
  });

  it("should to be able to create a match if season is the actual year", async () => {
    dateUtils.getYear = exactYearMock;

    expect(async () => {
      await seasonYearValidator.validate(dto, user);
    }).not.toThrow();
  });
});
