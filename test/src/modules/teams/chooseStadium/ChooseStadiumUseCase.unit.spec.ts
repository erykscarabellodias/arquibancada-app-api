import { User } from "../../../../../src/modules/accounts/entities/User";
import CheckIfUserHaveATeamService from "../../../../../src/modules/accounts/services/CheckIfUserHaveATeam.service";
import StadiumRepository from "../../../../../src/modules/stadiums/repository/implementations/typeorm/StadiumRepository";
import CheckIfUserTeamHaveAStadiumService from "../../../../../src/modules/stadiums/services/CheckIfUserTeamHaveAStadium.service";
import { TeamRepository } from "../../../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import ChooseStadiumUseCase from "../../../../../src/modules/teams/useCases/chooseStadium/ChooseStadiumUseCase";
import ChooseStadiumInputDto from "../../../../../src/modules/teams/useCases/chooseStadium/dto/ChooseStadiumInputDto";
import ChooseStadiumError from "../../../../../src/modules/teams/useCases/chooseStadium/errors/ChooseStadiumError";
import ClassValidatorValidationError from "../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  createdStadiumMock,
  stadiumDoesNotExistsMock,
} from "../../../../mocks/stadium/stadiumMocks";
import {
  chooseStadiumMock,
  returnTeamMock,
  teamDoesNotExist,
} from "../../../../mocks/teams/teamsMocks";

describe("choose team use case tests suit", () => {
  const userWithStadium: User = {
    id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
    name: "New User",
    email: "newuser@gmail.com",
    created_at: new Date(),
    password: "fakePassword",
    matches: [],
    team: {
      id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      city: "São Paulo",
      state: "São Paulo",
      created_at: new Date(),
      users: [],
      matchesAsOpponent: [],
      stadium: {
        id: "97c929f8-542d-45fa-bbdb-23fd63e2fee8",
        name: "Neo Química Arena",
        public_capacity: 46000,
        created_at: new Date(),
        teams: [],
        matches: [],
      },
    },
  };

  const userWithoutStadium: User = {
    id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
    name: "New User",
    email: "newuser@gmail.com",
    created_at: new Date(),
    password: "fakePassword",
    matches: [],
    team: {
      id: "f3472988-da25-4315-b01d-ba604bf5b3a9",
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      city: "São Paulo",
      state: "São Paulo",
      created_at: new Date(),
      users: [],
      stadium: null,
      matchesAsOpponent: [],
    },
  };

  const userWithoutTeam: User = {
    id: "96f35936-afd5-4d94-8a47-dfa3ac50d46b",
    name: "New User",
    email: "newuser@gmail.com",
    created_at: new Date(),
    password: "fakePassword",
    team: null,
    matches: [],
  };

  const teamRepository = new TeamRepository();
  const stadiumRepository = new StadiumRepository();
  const checkIfUserHaveATeamService = new CheckIfUserHaveATeamService();
  const checkIfUserTeamHaveAStadiumService =
    new CheckIfUserTeamHaveAStadiumService();
  const useCase = new ChooseStadiumUseCase(
    teamRepository,
    stadiumRepository,
    checkIfUserHaveATeamService,
    checkIfUserTeamHaveAStadiumService
  );

  it("should be able to choose a stadium to the user team", async () => {
    teamRepository.findById = returnTeamMock;
    teamRepository.chooseStadium = chooseStadiumMock;
    stadiumRepository.findById = createdStadiumMock;

    const dto: ChooseStadiumInputDto = {
      stadiumId: "786b3866-454b-4e44-be4b-b047b2d373df",
      user: userWithoutStadium,
    };

    await useCase.execute(dto);

    expect(teamRepository.chooseStadium).toHaveBeenCalled();
  });

  it("should not be able to choose another stadium for a team", async () => {
    teamRepository.findById = returnTeamMock;
    stadiumRepository.findById = stadiumDoesNotExistsMock;

    const dto: ChooseStadiumInputDto = {
      stadiumId: "e053faa0-35eb-4ffd-a0b9-b0e58e3235dc",
      user: userWithStadium,
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(
      new ChooseStadiumError("Seu time já tem um estádio cadastrado")
    );
  });

  it("should not be able to choose a stadium if user do not have a team", async () => {
    teamRepository.findById = returnTeamMock;
    stadiumRepository.findById = stadiumDoesNotExistsMock;

    const dto: ChooseStadiumInputDto = {
      stadiumId: "e053faa0-35eb-4ffd-a0b9-b0e58e3235dc",
      user: userWithoutTeam,
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(
      new ChooseStadiumError("Escolha um time antes de escolher um estádio")
    );
  });

  it("should not be able to choose an invalid stadium", async () => {
    teamRepository.findById = returnTeamMock;
    stadiumRepository.findById = stadiumDoesNotExistsMock;

    const dto: ChooseStadiumInputDto = {
      stadiumId: "e053faa0-35eb-4ffd-a0b9-b0e58e3235dc",
      user: userWithoutStadium,
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(new ChooseStadiumError("Este estádio não existe"));
  });

  it("should not be able to choose an invalid team", async () => {
    teamRepository.findById = teamDoesNotExist;
    stadiumRepository.findById = createdStadiumMock;

    const dto: ChooseStadiumInputDto = {
      stadiumId: "e053faa0-35eb-4ffd-a0b9-b0e58e3235dc",
      user: userWithoutStadium,
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(
      new ChooseStadiumError("O time vinculado ao seu perfil não existe")
    );
  });

  it("should not be able to choose a team without a team id", async () => {
    teamRepository.findById = teamDoesNotExist;
    stadiumRepository.findById = createdStadiumMock;

    const dto: ChooseStadiumInputDto = {
      stadiumId: "",
      user: userWithoutStadium,
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });
});
