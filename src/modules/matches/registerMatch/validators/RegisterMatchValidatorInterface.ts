import DateUtils from "../../../../shared/utils/DateUtils";
import { User } from "../../../accounts/entities/User";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";

export default interface RegisterMatchValidatorInterface {
  validate(dto: RegisterMatchInputDto, user: User): Promise<void>;
}
