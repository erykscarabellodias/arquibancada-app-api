import { Request, Response } from "express";
import ChooseStadiumUseCase from "./ChooseStadiumUseCase";
import { User } from "../../../accounts/entities/User";

export default class ChooseStadiumController {
  constructor(private readonly useCase: ChooseStadiumUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { stadiumId } = request.body;
    const user = request.user as User;

    await this.useCase.execute({ stadiumId, user });

    return response.status(200).send();
  }
}
