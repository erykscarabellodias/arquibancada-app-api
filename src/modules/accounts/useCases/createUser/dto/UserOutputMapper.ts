import { User } from "../../../entities/User";
import { UserOutputDto } from "./UserOutputDto";

export class UserOutputMapper {
  public static toMap({ id, name, email }: User): UserOutputDto {
    return {
      id,
      name,
      email,
    };
  }
}
