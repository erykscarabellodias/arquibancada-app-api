import { Request, Response } from "express";
import NumberOfMatchesUseCase from "./NumberOfMatchesUseCase";
import { User } from "../../../accounts/entities/User";

export default class NumberOfMatchesController {
  constructor(
    private readonly numberOfMatchesUseCase: NumberOfMatchesUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user as User;

    const numberOfMatches = await this.numberOfMatchesUseCase.execute(user);

    return response.status(200).send(numberOfMatches);
  }
}
