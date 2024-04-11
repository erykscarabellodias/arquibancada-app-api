import Player from "../../../../../src/modules/players/entites/Player";
import IPlayerRepository from "../../../../../src/modules/players/entites/repository/IPlayerRepository";
import PlayerRepository from "../../../../../src/modules/players/entites/repository/implementations/PlayerRepository";
import { CreatePlayerError } from "../../../../../src/modules/players/errors/CreatePlayerError";
import CreatePlayerUseCase from "../../../../../src/modules/players/useCases/createPlayer/CreatePlayerUseCase";
import { CreatePlayerInputDto } from "../../../../../src/modules/players/useCases/createPlayer/dto/CreatePlayerInputDto";
import ClassValidatorValidationError from "../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  playerDontExistsMock,
  playerMock,
} from "../../../../mocks/player/playerMocks";

describe("create player use case tests suit", () => {
  const repository: IPlayerRepository = new PlayerRepository();
  const useCase: CreatePlayerUseCase = new CreatePlayerUseCase(repository);

  const dto: CreatePlayerInputDto = {
    nickname: "Romero",
    complete_name: "Ángel Rodrigo Romero Villamayor",
  };

  it("should not to be able to create a player without nickname", async () => {
    const dto: CreatePlayerInputDto = {
      complete_name: "Ángel Rodrigo Romero Villamayor",
      nickname: "",
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });

  it("should not to be able to create a player without complete name", async () => {
    const dto: CreatePlayerInputDto = {
      complete_name: "",
      nickname: "Romero",
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });

  it("should not to be able an existent player", async () => {
    repository.findByNicknameAndCompleteName = playerMock;

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(
      new CreatePlayerError("Este jogador já está cadastrado")
    );
  });

  it("should to be able to create a player", async () => {
    repository.findByNicknameAndCompleteName = playerDontExistsMock;
    repository.create = playerMock;

    const player = await useCase.execute(dto);

    expect(player).toHaveProperty("id");
    expect(player).toHaveProperty("nickname");
    expect(player).toHaveProperty("complete_name");
  });
});
