import CreateTeamError from "../../../../../../src/modules/teams/errors/CreateTeamError";
import { TeamRepository } from "../../../../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import { CreateTeamUseCase } from "../../../../../../src/modules/teams/useCases/createTeam/CreateTeamUseCase";
import CreateTeamInputDto from "../../../../../../src/modules/teams/useCases/createTeam/dto/CreateTeamInputDto";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  returnForeignerTeamMock,
  returnNationalTeamMock,
  teamAlreadyExists,
  teamNotExistsYet,
} from "../../../../../mocks/teams/teamsMocks";

describe("create team unit tests suit", () => {
  const teamRepository = new TeamRepository();
  const useCase = new CreateTeamUseCase(teamRepository);

  it("should be able to create a new national team", async () => {
    teamRepository.create = returnNationalTeamMock;
    teamRepository.checkIfExists = teamNotExistsYet;

    const newTeam = await useCase.execute({
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      state: "São Paulo",
      city: "São Paulo",
      isForeigner: false,
    });

    expect(newTeam).toHaveProperty("id");
    expect(newTeam).toHaveProperty("complete_name");
    expect(newTeam).toHaveProperty("nickname");
    expect(newTeam).toHaveProperty("state");
    expect(newTeam).toHaveProperty("city");
    expect(newTeam).toHaveProperty("isForeigner");
  });

  it("should be able to create a new foreigner team", async () => {
    teamRepository.create = returnForeignerTeamMock;
    teamRepository.checkIfExists = teamNotExistsYet;

    const newTeam = await useCase.execute({
      complete_name: "Club Atlético Boca Juniors",
      nickname: "Boca Juniors",
      country: "Argentina",
      city: "Buenos Aires",
      isForeigner: true,
    });

    expect(newTeam).toHaveProperty("id");
    expect(newTeam).toHaveProperty("complete_name");
    expect(newTeam).toHaveProperty("nickname");
    expect(newTeam).toHaveProperty("country");
    expect(newTeam).toHaveProperty("city");
    expect(newTeam).toHaveProperty("isForeigner");
  });

  it("should not be able to create a team that already exists", async () => {
    teamRepository.create = returnNationalTeamMock;
    teamRepository.checkIfExists = teamAlreadyExists;

    expect(async () => {
      await useCase.execute({
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        state: "São Paulo",
        city: "São Paulo",
        isForeigner: false,
      });
    }).rejects.toThrow(new CreateTeamError("Este time já está cadastrado"));
  });

  test.each([
    [
      {
        complete_name: "",
        nickname: "Corinthians",
        city: "São Paulo",
        isForeigner: false,
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "",
        city: "São Paulo",
        isForeigner: false,
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        city: "São Paulo",
        isForeigner: false,
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        city: "",
        isForeigner: false,
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        city: "São Paulo",
        isForeigner: "",
      },
    ],
  ])(
    "should not to be able to create team without mandatory fields",
    async (param) => {
      teamRepository.create = returnNationalTeamMock;
      teamRepository.checkIfExists = teamNotExistsYet;

      expect(async () => {
        await useCase.execute(param);
      }).rejects.toThrow(ClassValidatorValidationError);
    }
  );

  it("should not to be able to create a foreigner team without a country", async () => {
    teamRepository.create = returnForeignerTeamMock;
    teamRepository.checkIfExists = teamNotExistsYet;

    const foreignerTeam: CreateTeamInputDto = {
      complete_name: "Club Atlético Boca Juniors",
      nickname: "Boca Juniors",
      city: "Buenos Aires",
      isForeigner: true,
    };

    expect(async () => {
      await useCase.execute(foreignerTeam);
    }).rejects.toThrow(
      new CreateTeamError("Um time estrangeiro precisa de um país")
    );
  });

  it("should not to be able to create a national team without a state", async () => {
    teamRepository.create = returnForeignerTeamMock;
    teamRepository.checkIfExists = teamNotExistsYet;

    const foreignerTeam: CreateTeamInputDto = {
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      city: "São Paulo",
      isForeigner: false,
    };

    expect(async () => {
      await useCase.execute(foreignerTeam);
    }).rejects.toThrow(
      new CreateTeamError("Um time nacional precisa de um estado")
    );
  });
});
