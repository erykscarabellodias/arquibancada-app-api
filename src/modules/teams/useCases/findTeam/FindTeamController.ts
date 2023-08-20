import { Request, Response } from "express";
import FindTeamUseCase from "./FindTeamUseCase";
import { FindTeamInputDto } from "./dto/FindTeamInputDto";

export default class FindTeamController {
  private useCase: FindTeamUseCase;

  constructor(useCase: FindTeamUseCase) {
    this.useCase = useCase;
  }
  async handle(request: Request, response: Response) {
    const { name } = request.query;

    const teams = await this.useCase.execute({ name } as FindTeamInputDto);

    return response.status(200).json(teams).send();
  }
}
