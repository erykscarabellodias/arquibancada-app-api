import { IsNotEmpty, IsString } from "class-validator";

export default class CreateTournamentInputDto {
  @IsString({ message: "O campo name deve ser uma string" })
  @IsNotEmpty({ message: "O campo name é obrigatório" })
  name: string;
}
