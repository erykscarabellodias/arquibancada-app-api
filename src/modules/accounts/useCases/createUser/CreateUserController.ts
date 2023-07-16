import { Request, Response } from "express";
import { CreateUserDto } from "./dto/CreateUserDto";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    this.useCase = useCase;
  }

  public async handle(req: Request, res: Response) {
    const createUserDto: CreateUserDto = req.body;

    const user = await this.useCase.execute(createUserDto);

    return res.status(201).send(user);
  }
}
