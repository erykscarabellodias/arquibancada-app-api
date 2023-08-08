import { Request, Response } from "express";
import { CreateTeamUseCase } from "./CreateTeamUseCase";

export default class CreateTeamController {
  private useCase: CreateTeamUseCase;

  constructor(useCase: CreateTeamUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const createTeamDto = request.body;

    const team = await this.useCase.execute(createTeamDto);

    return response.status(201).send(team);
  }
}
