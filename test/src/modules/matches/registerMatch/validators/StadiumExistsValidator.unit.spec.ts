import { User } from "../../../../../../src/modules/accounts/entities/User";
import RegisterMatchInputDto from "../../../../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../../../../src/modules/matches/registerMatch/enums/FieldCommand";
import RegisterMatchError from "../../../../../../src/modules/matches/registerMatch/errors/RegisterMatchError";
import { StadiumExistsValidator } from "../../../../../../src/modules/matches/registerMatch/validators/StadiumExistsValidator";
import IStadiumRepository from "../../../../../../src/modules/stadiums/repository/IStadiumRepository";
import StadiumRepository from "../../../../../../src/modules/stadiums/repository/implementations/typeorm/StadiumRepository";
import {
  createdStadiumMock,
  stadiumDoesNotExistsMock,
} from "../../../../../mocks/stadium/stadiumMocks";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("user must have team selected unit tests suit", () => {
  const stadiumRepository: IStadiumRepository = new StadiumRepository();

  const stadiumExistsValidator: StadiumExistsValidator =
    new StadiumExistsValidator(stadiumRepository);

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

  it("should not to be able to create a match if stadium does not exists", async () => {
    stadiumRepository.findById = stadiumDoesNotExistsMock;

    expect(async () => {
      await stadiumExistsValidator.validate(dto, user);
    }).rejects.toThrow(new RegisterMatchError("O estádio enviado não existe"));
  });

  it("should to be able to create a match if stadium exists", async () => {
    stadiumRepository.findById = createdStadiumMock;

    expect(async () => {
      await stadiumExistsValidator.validate(dto, user);
    }).not.toThrow();
  });
});
