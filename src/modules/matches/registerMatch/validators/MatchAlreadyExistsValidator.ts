import { User } from "../../../accounts/entities/User";
import IMatchRepository from "../../repository/IMatchRepository";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export class MatchAlreadyExistsValidator
  implements RegisterMatchValidatorInterface
{
  constructor(private readonly matchRepository: IMatchRepository) {}

  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    const matchAlreadyExists =
      await this.matchRepository.findBySeasonTournamentCommandOpponentAndUser(
        dto.season,
        dto.tournamentId,
        dto.fieldCommand,
        dto.opponentId,
        user.id
      );

    if (matchAlreadyExists) {
      throw new RegisterMatchError("Este jogo já foi cadastrado");
    }
  }
}
