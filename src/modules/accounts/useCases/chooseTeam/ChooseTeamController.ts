import { Request, Response } from "express";
import ChooseTeamUseCase from "./ChooseTeamUseCase";
import { User } from "../../entities/User";

export default class ChooseTeamController {
  private useCase: ChooseTeamUseCase;

  constructor(chooseTeamUseCase: ChooseTeamUseCase) {
    this.useCase = chooseTeamUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { teamId } = request.body;
    const user = request.user as User;

    const userWithTeam = await this.useCase.execute({ teamId, user });

    return response.status(200).json(userWithTeam).send();
  }
}
