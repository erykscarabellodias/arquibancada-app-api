import IMatchRepository from "../../../matches/repository/IMatchRepository";
import MatchRepository from "../../../matches/repository/implementations/MatchRepository";
import CalculateSuccessRateService from "../../services/CalculateSuccessRateService";
import SuccessRateController from "./SuccessRateController";
import SuccessRateUseCase from "./SuccessRateUseCase";

const successRate = (): SuccessRateController => {
  const matchRepository: IMatchRepository = new MatchRepository();
  const calculateSuccessRateService: CalculateSuccessRateService =
    new CalculateSuccessRateService();
  const useCase: SuccessRateUseCase = new SuccessRateUseCase(
    matchRepository,
    calculateSuccessRateService
  );
  const controller: SuccessRateController = new SuccessRateController(useCase);

  return controller;
};

export default successRate();
