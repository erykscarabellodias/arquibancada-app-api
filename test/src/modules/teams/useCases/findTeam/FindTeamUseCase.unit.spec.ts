import { TeamRepository } from "../../../../../../src/modules/teams/repository/implementations/typeorm/TeamRespository";
import FindTeamUseCase from "../../../../../../src/modules/teams/useCases/findTeam/FindTeamUseCase";
import { FindTeamInputDto } from "../../../../../../src/modules/teams/useCases/findTeam/dto/FindTeamInputDto";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  returnEmptyTeamList,
  returnTeamListMock,
} from "../../../../../mocks/teams/teamsMocks";

describe("find team use case tests suit", () => {
  const repository = new TeamRepository();
  const findTeamUseCase = new FindTeamUseCase(repository);

  it("should be able to find a team", async () => {
    repository.findByName = returnTeamListMock;

    const dto: FindTeamInputDto = { name: "Cor" };

    const teams = await findTeamUseCase.execute(dto);

    expect(teams).toHaveLength(2);
    expect(teams[0]).toHaveProperty("id");
    expect(teams[0]).toHaveProperty("complete_name");
  });

  it("should be able to receive an null value if no one team was found", async () => {
    repository.findByName = returnEmptyTeamList;

    const dto: FindTeamInputDto = { name: "Atle" };

    const teams = await findTeamUseCase.execute(dto);

    expect(teams).toHaveLength(0);
  });

  it("should not be able to find a team with less than 3 letters name", async () => {
    const dto: FindTeamInputDto = { name: "Co" };

    expect(async () => {
      await findTeamUseCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });

  it("should not be able to find a team with empty name", async () => {
    const dto: FindTeamInputDto = { name: "" };

    expect(async () => {
      await findTeamUseCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });
});
