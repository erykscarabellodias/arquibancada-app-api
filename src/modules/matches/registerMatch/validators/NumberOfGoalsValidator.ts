import { User } from "../../../accounts/entities/User";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export class NumberOfGoalsValidator implements RegisterMatchValidatorInterface {
  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    if (dto.yourTeamGoals !== dto.scorers.length) {
      throw new RegisterMatchError(
        "O número de gols do seu time o número de marcadores não são compatíveis"
      );
    }
  }
}
