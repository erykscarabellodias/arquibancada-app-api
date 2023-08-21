import { User } from "../../../entities/User";
import { UserOutputDto } from "./UserOutputDto";

export class UserVisibleAttributesMapper {
  public static toMap({ id, name, email, team }: User): UserOutputDto {
    return {
      id,
      name,
      email,
      team,
    };
  }
}
