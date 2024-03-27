import { User } from "../../../accounts/entities/User";
import ITournamentRepository from "../../../tournament/repository/ITournamentRepository";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export class TournamentExistsValidator
  implements RegisterMatchValidatorInterface
{
  constructor(private readonly tournamentRepository: ITournamentRepository) {}

  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    const tournament = await this.tournamentRepository.findById(
      dto.tournamentId
    );

    if (!tournament) {
      throw new RegisterMatchError("O campeonato enviado não existe");
    }
  }
}
