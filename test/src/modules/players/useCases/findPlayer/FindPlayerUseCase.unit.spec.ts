import PlayerRepository from "../../../../../../src/modules/players/entites/repository/implementations/PlayerRepository";
import FindPlayerUseCase from "../../../../../../src/modules/players/useCases/findPlayer/FindPlayerUseCase";
import FindPlayerInputDto from "../../../../../../src/modules/players/useCases/findPlayer/dto/FindPlayerInputDto";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import {
  playerDontExistsMock,
  playersExistsMock,
} from "../../../../../mocks/player/playerMocks";

describe("find player use case unit tests suit", () => {
  const repository = new PlayerRepository();
  const useCase = new FindPlayerUseCase(repository);

  it("should not to be able to find a player with less than 3 characters", async () => {
    const dto: FindPlayerInputDto = {
      nicknameOrName: "Y",
    };

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });

  it("should be able to return an empty array if search doesnt have matches", async () => {
    const dto: FindPlayerInputDto = {
      nicknameOrName: "Fagner",
    };

    repository.findByNicknameOrName = playerDontExistsMock;

    const result = await useCase.execute(dto);

    expect(result.length).toBe(0);
  });

  it("should be able to find players", async () => {
    const dto: FindPlayerInputDto = {
      nicknameOrName: "Rog",
    };

    repository.findByNicknameOrName = playersExistsMock;

    const result = await useCase.execute(dto);

    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("complete_name");
    expect(result[0]).toHaveProperty("nickname");
  });
});
