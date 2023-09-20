import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../../../../accounts/entities/User";

export default class ChooseStadiumInputDto {
  @IsNotEmpty({ message: "O campo stadiumId não pode ser vazio" })
  @IsString({ message: "O campo stadiumId deve ser uma string" })
  stadiumId: string;
  user: User;
}
