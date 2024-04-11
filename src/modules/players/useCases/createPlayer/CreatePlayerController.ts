import { Request, Response } from "express";
import CreatePlayerUseCase from "./CreatePlayerUseCase";

export default class CreatePlayerController {
  constructor(private readonly createPlayerUseCase: CreatePlayerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const dto = request.body;

    const createdPlayer = await this.createPlayerUseCase.execute(dto);

    return response.status(201).send(createdPlayer);
  }
}
