import { Request, Response } from "express";
import SuccessRateUseCase from "./SuccessRateUseCase";
import { User } from "../../../accounts/entities/User";

export default class SuccessRateController {
  constructor(private readonly successRateUseCase: SuccessRateUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user as User;

    const successRAte = await this.successRateUseCase.execute(user);

    return response.status(200).send(successRAte);
  }
}
