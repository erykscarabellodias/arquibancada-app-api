import { ITeamRepository } from "../../../teams/repository/ITeamRepository";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export default class OpponentExistsValidator
  implements RegisterMatchValidatorInterface
{
  constructor(private readonly teamRepository: ITeamRepository) {}

  async validate(dto: RegisterMatchInputDto): Promise<void> {
    const team = await this.teamRepository.findById(dto.opponentId);

    if (!team) {
      throw new RegisterMatchError(
        "O adversário não está cadastrado na plataforma"
      );
    }
  }
}
