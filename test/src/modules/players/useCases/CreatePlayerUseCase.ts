import IPlayerRepository from "../../../../../src/modules/players/entites/repository/IPlayerRepository";
import PlayerRepository from "../../../../../src/modules/players/entites/repository/implementations/PlayerRepository";
import CreatePlayerUseCase from "../../../../../src/modules/players/useCases/createPlayer/CreatePlayerUseCase";
import { CreatePlayerInputDto } from "../../../../../src/modules/players/useCases/createPlayer/dto/CreatePlayerInputDto";
import ClassValidatorValidationError from "../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";

describe("create player use case tests suit", () => {
  const repository: IPlayerRepository = new PlayerRepository();
  const useCase: CreatePlayerUseCase = new CreatePlayerUseCase(repository);

  it("should not to be able to create a player without nickname", async () => {
    const dto: CreatePlayerInputDto = {
      complete_name: "Ángel Rodrigo Romero Villamayor",
      nickname: "",
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });
});
