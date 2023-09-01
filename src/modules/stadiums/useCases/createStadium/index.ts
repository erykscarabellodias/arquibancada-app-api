import StadiumRepository from "../../repository/implementations/typeorm/StadiumRepository";
import CreateStadiumController from "./CreateStadiumController";
import CreateStadiumUseCase from "./CreateStadiumUseCase";

const createStadium = (): CreateStadiumController => {
  const repository = new StadiumRepository();
  const useCase = new CreateStadiumUseCase(repository);
  const controller = new CreateStadiumController(useCase);

  return controller;
};

export default createStadium();
