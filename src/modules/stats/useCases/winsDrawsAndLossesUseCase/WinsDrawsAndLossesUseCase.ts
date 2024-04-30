import { User } from "../../../accounts/entities/User";
import Result from "../../../matches/registerMatch/enums/Result";
import IMatchRepository from "../../../matches/repository/IMatchRepository";
import WinDrawAndLossOutputDto from "./dto/WinsDrawsAndLossesOutputDto";
import WinsDrawsAndLossesError from "./errors/WinsDrawsAndLossesError";

export default class WinDrawAndLossUseCase {
  constructor(private readonly matchRepository: IMatchRepository) {}

  async execute(user: User): Promise<WinDrawAndLossOutputDto> {
    if (!user) {
      throw new WinsDrawsAndLossesError("Usuário inválido");
    }

    if (!user.team) {
      throw new WinsDrawsAndLossesError("Você ainda não selecionou um time");
    }

    const matches = await this.matchRepository.countMatchesByUserId(user.id);

    if (!matches) {
      throw new WinsDrawsAndLossesError(
        "Você ainda não tem partidas cadastradas"
      );
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

    const results: WinDrawAndLossOutputDto = {
      wins,
      draws,
      losses,
    };

    return results;
  }
}
