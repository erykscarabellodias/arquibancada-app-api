import { Request, Response } from "express";
import WinsDrawsAndLossesUseCase from "./WinsDrawsAndLossesUseCase";
import { User } from "../../../accounts/entities/User";

export default class WinsDrawsAndLossesController {
  constructor(private readonly useCase: WinsDrawsAndLossesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user as User;

    const results = await this.useCase.execute(user);

    return response.status(200).send(results);
  }
}
