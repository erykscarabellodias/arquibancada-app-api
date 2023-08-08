import CreateTeamError from "../../../../../../src/modules/teams/errors/CreateTeamError";
import { TeamRepository } from "../../../../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import { CreateTeamUseCase } from "../../../../../../src/modules/teams/useCases/createTeam/CreateTeamUseCase";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  returnTeamMock,
  teamAlreadyExists,
  teamNotExistsYet,
} from "../../../../../mocks/teams/teamsMocks";

describe("create team unit tests suit", () => {
  const teamRepository = new TeamRepository();
  const useCase = new CreateTeamUseCase(teamRepository);

  it("should be able to create a new team", async () => {
    teamRepository.create = returnTeamMock;
    teamRepository.checkIfExists = teamNotExistsYet;

    const newTeam = await useCase.execute({
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      state: "São Paulo",
      city: "São Paulo",
    });

    expect(newTeam).toHaveProperty("id");
    expect(newTeam).toHaveProperty("complete_name");
    expect(newTeam).toHaveProperty("nickname");
    expect(newTeam).toHaveProperty("state");
    expect(newTeam).toHaveProperty("city");
  });

  it("should not be able to create a team that already exists", async () => {
    teamRepository.create = returnTeamMock;
    teamRepository.checkIfExists = teamAlreadyExists;

    expect(async () => {
      await useCase.execute({
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        state: "São Paulo",
        city: "São Paulo",
      });
    }).rejects.toThrow(new CreateTeamError("Este time já está cadastrado"));
  });

  test.each([
    [
      {
        complete_name: "",
        nickname: "Corinthians",
        state: "São Paulo",
        city: "São Paulo",
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "",
        state: "São Paulo",
        city: "São Paulo",
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        state: "",
        city: "São Paulo",
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        state: "São Paulo",
        city: "",
      },
    ],
  ])(
    "should not to be able to create team without mandatory fields",
    async (param) => {
      teamRepository.create = returnTeamMock;
      teamRepository.checkIfExists = teamNotExistsYet;

      expect(async () => {
        await useCase.execute(param);
      }).rejects.toThrow(ClassValidatorValidationError);
    }
  );
});
