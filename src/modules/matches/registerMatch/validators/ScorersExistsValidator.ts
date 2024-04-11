import { User } from "../../../accounts/entities/User";
import IPlayerRepository from "../../../players/entites/repository/IPlayerRepository";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export default class ScorersExistsValidator
  implements RegisterMatchValidatorInterface
{
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    const { scorers } = dto;

    if (scorers) {
      for (const scorer of scorers) {
        const scorerExists = await this.playerRepository.findById(scorer.id);

        if (!scorerExists) {
          throw new RegisterMatchError(
            "Algum jogador enviado não está cadastrado"
          );
        }
      }
    }
  }
}
