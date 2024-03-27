import { User } from "../../../accounts/entities/User";
import IStadiumRepository from "../../../stadiums/repository/IStadiumRepository";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import FieldCommand from "../enums/FieldCommand";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export class FieldCommandExistsValidator
  implements RegisterMatchValidatorInterface
{
  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    const fieldCommandExists = Object.values(FieldCommand).includes(
      dto.fieldCommand
    );

    if (!fieldCommandExists) {
      throw new RegisterMatchError(
        "O tipo de mando de campo enviado não existe"
      );
    }
  }
}
