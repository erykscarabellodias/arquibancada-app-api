import { appDataSource } from "../../../../config/database/typeorm/data-source";
import { UserRepository } from "../../repositories/implementations/typeorm/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const createUser = (): CreateUserController => {
  const repository = new UserRepository();

  const useCase = new CreateUserUseCase(repository);

  const controller = new CreateUserController(useCase);

  return controller;
};

export default createUser();
