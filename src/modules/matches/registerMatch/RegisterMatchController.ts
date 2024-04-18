import { Request, Response } from "express";
import RegisterMatchUseCaseDto from "./RegisterMatchUseCase";
import { User } from "../../accounts/entities/User";

export default class RegisterMatchController {
  constructor(private readonly registerMatchUseCase: RegisterMatchUseCaseDto) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const dto = request.body;
    const user = request.user as User;

    const match = await this.registerMatchUseCase.execute(dto, user);

    return response.status(201).send(match);
  }
}
