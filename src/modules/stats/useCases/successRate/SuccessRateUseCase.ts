import { User } from "../../../accounts/entities/User";
import Result from "../../../matches/registerMatch/enums/Result";
import IMatchRepository from "../../../matches/repository/IMatchRepository";
import CalculateSuccessRateService from "../../services/CalculateSuccessRateService";
import SuccessRateOutputDto from "./dto/SuccessRateOutputDto";
import SuccessRateError from "./errors/SuccessRateError";

export default class SuccessRateUseCase {
  constructor(
    private readonly matchRepository: IMatchRepository,
    private readonly calculateSuccessRateService: CalculateSuccessRateService
  ) {}

  async execute(user: User): Promise<SuccessRateOutputDto> {
    if (!user) {
      throw new SuccessRateError("Usuário inválido");
    }

    if (!user.team) {
      throw new SuccessRateError("Você ainda não selecionou um time");
    }

    const matches = await this.matchRepository.countMatchesByUserId(user.id);

    if (!matches) {
      throw new SuccessRateError("Você ainda não tem partidas cadastradas");
    }

    const wins = await this.matchRepository.countResultsByUserId(
      user.id,
      Result.WIN
    );

    const draws = await this.matchRepository.countResultsByUserId(
      user.id,
      Result.DRAW
    );

    const losses = await this.matchRepository.countResultsByUserId(
      user.id,
      Result.LOSS
    );

    const successRate = this.calculateSuccessRateService.calculate(
      wins,
      draws,
      losses,
      matches
    );

    return { successRate };
  }
}
