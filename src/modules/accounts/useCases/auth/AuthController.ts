import { Request, Response } from "express";
import AuthUseCase from "./AuthUseCase";

export class AuthController {
  private authUseCase: AuthUseCase;

  constructor(authUseCase: AuthUseCase) {
    this.authUseCase = authUseCase;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authOutputDto = await this.authUseCase.execute({ email, password });

    return response.status(200).send(authOutputDto);
  }
}
