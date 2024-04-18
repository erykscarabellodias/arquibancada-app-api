import DateUtils from "../../../../shared/utils/DateUtils";
import { User } from "../../../accounts/entities/User";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export default class MatchDateCantBeInFutureValidator
  implements RegisterMatchValidatorInterface
{
  constructor(private readonly dateUtils: DateUtils) {}

  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    if (dto.date > this.dateUtils.getTodayDate()) {
      throw new RegisterMatchError(
        "A partida não pode ter sido disputada no futuro"
      );
    }
  }
}
