import MatchRepository from "../../../matches/repository/implementations/MatchRepository";
import WinsDrawsAndLossesController from "./WinsDrawsAndLossesController";
import WinsDrawsAndLossesUseCase from "./WinsDrawsAndLossesUseCase";

const winsDrawsAndLosses = (): WinsDrawsAndLossesController => {
  const repository = new MatchRepository();
  const useCase = new WinsDrawsAndLossesUseCase(repository);
  const controller = new WinsDrawsAndLossesController(useCase);

  return controller;
};

export default winsDrawsAndLosses();
