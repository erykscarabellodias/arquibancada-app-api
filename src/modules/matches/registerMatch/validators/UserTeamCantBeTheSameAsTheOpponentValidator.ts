import { User } from "../../../accounts/entities/User";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export class UserTeamCantBeTheSameAsTheOpponentValidator
  implements RegisterMatchValidatorInterface
{
  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    if (user.team!.id === dto.opponentId) {
      throw new RegisterMatchError(
        "O time do usuário não pode ser o mesmo do adversário"
      );
    }
  }
}
