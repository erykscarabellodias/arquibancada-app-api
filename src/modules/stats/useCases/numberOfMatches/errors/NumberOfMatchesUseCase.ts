import { User } from "../../../../accounts/entities/User";
import IMatchRepository from "../../../../matches/repository/IMatchRepository";
import NumberOfMatchesError from "../NumberOfMatchesError";
import NumberOfMatchesOutputDto from "../dto/NumberOfMatchesOutputDto";

export default class NumberOfMatchesUseCase {
  constructor(private readonly matchRepository: IMatchRepository) {}

  async execute(user: User): Promise<NumberOfMatchesOutputDto> {
    if (!user) {
      throw new NumberOfMatchesError("Este usuário não existe");
    }

    if (!user.team) {
      throw new NumberOfMatchesError("Este usuário ainda não escolheu um time");
    }

    const numberOfMatches: number =
      await this.matchRepository.countMatchesByUserId(user.id);

    const matches: NumberOfMatchesOutputDto = { numberOfMatches };

    return matches;
  }
}
