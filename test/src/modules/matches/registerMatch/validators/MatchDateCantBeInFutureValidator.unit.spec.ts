import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import MatchDateCantBeInFutureValidator from "../../../../../../src/modules/matches/registerMatch/validators/MatchDateCantBeInFutureValidator";
import DateUtils from "../../../../../../src/shared/utils/DateUtils";
import {
  exactDayMock,
  futureDayMock,
  pastDayMock,
} from "../../../../../mocks/dateUtils/dateUtilMocks";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("match date cant be in future validator unit tests suit", () => {
  const dateUtils: DateUtils = new DateUtils();

  const validator: MatchDateCantBeInFutureValidator =
    new MatchDateCantBeInFutureValidator(dateUtils);

  const user = returnUserWithTeamMock();

  it("it not should be able to register a match in future", async () => {
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

    dateUtils.getTodayDate = pastDayMock;

    expect(async () => {
      await validator.validate(dto, user);
    }).rejects.toThrow(
      new RegisterMatchError("A partida não pode ter sido disputada no futuro")
    );
  });

  it("it should be able to register a match in past", async () => {
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

    dateUtils.getTodayDate = futureDayMock;

    expect(async () => {
      await validator.validate(dto, user);
    }).not.toThrow();
  });

  it("it should be able to register a match in same day", async () => {
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

    dateUtils.getTodayDate = exactDayMock;

    expect(async () => {
      await validator.validate(dto, user);
    }).not.toThrow();
  });
});
