import { User } from "../../../../../../src/modules/accounts/entities/User";
import { UserRepository } from "../../../../../../src/modules/accounts/repositories/implementations/typeorm/UserRepository";
import ChooseTeamUseCase from "../../../../../../src/modules/accounts/useCases/chooseTeam/ChooseTeamUseCase";
import ChooseTeamError from "../../../../../../src/modules/accounts/useCases/chooseTeam/errors/ChooseTeamError";
import { UserOutputDto } from "../../../../../../src/modules/accounts/useCases/createUser/dto/UserOutputDto";
import { TeamRepository } from "../../../../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import {
  returnTeamMock,
  teamDoesNotExist,
} from "../../../../../mocks/teams/teamsMocks";
import { returnUserWithTeamMock } from "../../../../../mocks/user/userMocks";

describe("choose team unit tests suit", () => {
  const teamRepository = new TeamRepository();
  const userRepository = new UserRepository();
  const useCase = new ChooseTeamUseCase(teamRepository, userRepository);

  const userWithoutTeam: User = {
    id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
    name: "New User",
    email: "newuser@gmail.com",
    password: "fakepassword",
    created_at: new Date(),
    team: null,
  };

  const userWithTeam: User = {
    id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
    name: "New User",
    email: "newuser@gmail.com",
    password: "fakepassword",
    created_at: new Date(),
    team: {
      id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      city: "São Paulo",
      state: "São Paulo",
      created_at: new Date(),
      users: [],
      stadium: null,
    },
  };

  it("should be able to choose a team", async () => {
    teamRepository.findById = returnTeamMock;
    userRepository.chooseTeam = returnUserWithTeamMock;

    const userWithTeam = await useCase.execute({
      teamId: "f3472988-da25-4315-b01d-ba604bf5b3a9",
      user: userWithoutTeam,
    });

    expect(userWithTeam.team).not.toBeNull();
    expect(userWithTeam.team).toHaveProperty("id");
    expect(userWithTeam.team).toHaveProperty("nickname");
  });

  it("should not be able to choose an inexistent team", async () => {
    teamRepository.findById = teamDoesNotExist;

    expect(async () => {
      await useCase.execute({
        teamId: "f3472988-da25-4315-b01d-ba604bf5b3a9",
        user: userWithoutTeam,
      });
    }).rejects.toThrow(new ChooseTeamError("Este time não existe"));
  });

  it("should not be able to choose a team twice", async () => {
    teamRepository.findById = returnTeamMock;

    expect(async () => {
      await useCase.execute({
        teamId: "f3472988-da25-4315-b01d-ba604bf5b3a9",
        user: userWithTeam,
      });
    }).rejects.toThrow(
      new ChooseTeamError("Este usuário já torce para um time")
    );
  });
});
