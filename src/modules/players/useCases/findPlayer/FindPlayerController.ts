import { Request, Response } from "express";
import FindPlayerUseCase from "./FindPlayerUseCase";
import FindPlayerInputDto from "./dto/FindPlayerInputDto";

export default class FindPlayerController {
  constructor(private readonly findPlayerUseCase: FindPlayerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { nicknameOrName } = request.query;

    const players = await this.findPlayerUseCase.execute({
      nicknameOrName,
    } as FindPlayerInputDto);

    return response.send(players);
  }
}
