import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { User } from "../../../entities/User";

export default class ChooseTeamInputDto {
  @IsUUID("4", { message: "O campo teamId deve ser um UUID" })
  @IsNotEmpty({ message: "O campo teamId é obrigatório" })
  teamId: string;

  user: User;
}
