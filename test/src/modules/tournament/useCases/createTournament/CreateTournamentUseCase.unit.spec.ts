import TournamentRepository from "../../../../../../src/modules/tournament/repository/implementations/typeorm/TournamentRepository";
import CreateTournamentUseCase from "../../../../../../src/modules/tournament/useCases/createTournament/CreateTournamentUseCase";
import CreateTournamentInputDto from "../../../../../../src/modules/tournament/useCases/createTournament/dto/CreateTournamentInputDto";
import CreateTournamentError from "../../../../../../src/modules/tournament/useCases/createTournament/errors/CreateTournamentError";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  createdTournament,
  tournamentDoesNotExists,
} from "../../../../../mocks/tournament/tournamentMocks";

describe("create tournament use case unit tests suit", () => {
  const repository = new TournamentRepository();
  const useCase = new CreateTournamentUseCase(repository);

  it("should be able to create a new tournament", async () => {
    repository.findByName = tournamentDoesNotExists;
    repository.create = createdTournament;

    const dto: CreateTournamentInputDto = {
      name: "Taça Libertadores da América",
    };

    const result = await useCase.execute(dto);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("created_at");
  });

  it("should not to be able to create an existent tournament", async () => {
    repository.findByName = createdTournament;
    repository.create = createdTournament;

    const dto: CreateTournamentInputDto = {
      name: "Taça Libertadores da América",
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(new CreateTournamentError("Este campeonato já existe"));
  });

  it("should not to be able to create without name field", async () => {
    const dto: CreateTournamentInputDto = {
      name: "",
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });
});
