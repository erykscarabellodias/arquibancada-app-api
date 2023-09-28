import { Request, Response } from "express";
import CreateTournamentUseCase from "./CreateTournamentUseCase";

export default class CreateTournamentController {
  constructor(private readonly useCase: CreateTournamentUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const newTournament = await this.useCase.execute({ name });

    return response.status(201).send(newTournament);
  }
}
