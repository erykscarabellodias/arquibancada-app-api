import { Request, Response } from "express";
import ListTournamentsUseCase from "./ListTournamentsUseCase";

export default class ListTournamentsController {
  constructor(
    private readonly listTournamentsUseCase: ListTournamentsUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const tournaments = await this.listTournamentsUseCase.execute();

    return response.status(200).send(tournaments);
  }
}
