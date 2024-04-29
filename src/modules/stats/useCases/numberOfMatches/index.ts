import MatchRepository from "../../../matches/repository/implementations/MatchRepository";
import NumberOfMatchesController from "./NumberOfMatchesController";
import NumberOfMatchesUseCase from "./NumberOfMatchesUseCase";

const numberOfMatches = (): NumberOfMatchesController => {
  const repository = new MatchRepository();
  const useCase = new NumberOfMatchesUseCase(repository);
  const controller = new NumberOfMatchesController(useCase);

  return controller;
};

export default numberOfMatches();
