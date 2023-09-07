import { Request, Response } from "express";
import FindStadiumUseCase from "./FindStadiumUseCase";
import FindStadiumInputDto from "./dto/FindStadiumInputDto";

export default class FindStadiumController {
  private useCase: FindStadiumUseCase;

  constructor(useCase: FindStadiumUseCase) {
    this.useCase = useCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const stadiums = await this.useCase.execute({
      name,
    } as FindStadiumInputDto);

    return response.status(200).send(stadiums);
  }
}
