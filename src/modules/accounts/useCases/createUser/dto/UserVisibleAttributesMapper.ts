import { User } from "../../../entities/User";
import { UserOutputDto } from "./UserOutputDto";

export class UserVisibleAttributesMapper {
  public static toMap({ id, name, email }: User): UserOutputDto {
    return {
      id,
      name,
      email,
    };
  }
}
