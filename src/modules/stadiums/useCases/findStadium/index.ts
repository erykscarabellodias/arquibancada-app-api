import StadiumRepository from "../../repository/implementations/typeorm/StadiumRepository";
import FindStadiumController from "./FindStadiumController";
import FindStadiumUseCase from "./FindStadiumUseCase";

const findStadium = (): FindStadiumController => {
  const repository = new StadiumRepository();
  const useCase = new FindStadiumUseCase(repository);
  const controller = new FindStadiumController(useCase);

  return controller;
};

export default findStadium();
