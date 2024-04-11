import IPlayerRepository from "../../entites/repository/IPlayerRepository";
import PlayerRepository from "../../entites/repository/implementations/PlayerRepository";
import CreatePlayerController from "./CreatePlayerController";
import CreatePlayerUseCase from "./CreatePlayerUseCase";

const createPlayer = (): CreatePlayerController => {
  const repository: IPlayerRepository = new PlayerRepository();
  const useCase: CreatePlayerUseCase = new CreatePlayerUseCase(repository);
  const controller: CreatePlayerController = new CreatePlayerController(
    useCase
  );

  return controller;
};

export default createPlayer();
