import PlayerRepository from "../../entites/repository/implementations/PlayerRepository";
import FindPlayerController from "./FindPlayerController";
import FindPlayerUseCase from "./FindPlayerUseCase";

const findPlayerController = (): FindPlayerController => {
  const repository = new PlayerRepository();
  const useCase = new FindPlayerUseCase(repository);
  const controller = new FindPlayerController(useCase);

  return controller;
};

export default findPlayerController();
