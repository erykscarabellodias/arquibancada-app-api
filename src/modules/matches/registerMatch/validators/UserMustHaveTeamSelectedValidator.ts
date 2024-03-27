import { User } from "../../../accounts/entities/User";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export class UserMustHaveTeamSelectedValidator
  implements RegisterMatchValidatorInterface
{
  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    if (user.team === null) {
      throw new RegisterMatchError("O usuário ainda não selecionou um time");
    }
  }
}
