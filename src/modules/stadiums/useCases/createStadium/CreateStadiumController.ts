import { Request, Response } from "express";
import CreateStadiumUseCase from "./CreateStadiumUseCase";

export default class CreateStadiumController {
  private useCase: CreateStadiumUseCase;

  constructor(useCase: CreateStadiumUseCase) {
    this.useCase = useCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const dto = request.body;

    const createdTeam = await this.useCase.execute(dto);

    return response.status(201).send(createdTeam);
  }
}
