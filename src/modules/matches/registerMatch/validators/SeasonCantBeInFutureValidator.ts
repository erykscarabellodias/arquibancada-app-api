import DateUtils from "../../../../shared/utils/DateUtils";
import { User } from "../../../accounts/entities/User";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export class SeasonCantBeInFutureValidator
  implements RegisterMatchValidatorInterface
{
  constructor(private readonly dateUtils: DateUtils) {}

  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    if (dto.season > this.dateUtils.getYear()) {
      throw new RegisterMatchError(
        "A temporada da partida não pode ser maior que a atual"
      );
    }
  }
}
