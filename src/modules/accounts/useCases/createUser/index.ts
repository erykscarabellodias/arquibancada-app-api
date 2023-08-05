import { PasswordService } from "../../../../shared/security/password/PasswordService";
import { UserRepository } from "../../repositories/implementations/typeorm/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const createUser = (): CreateUserController => {
  const repository = new UserRepository();
  const passwordService = new PasswordService();

  const useCase = new CreateUserUseCase(repository, passwordService);

  const controller = new CreateUserController(useCase);

  return controller;
};

export default createUser();
