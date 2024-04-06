import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlayerInputDto {
  @IsNotEmpty({ message: "O campo nickname é obrigatório" })
  @IsString({ message: "O campo nickname deve ser uma string" })
  nickname: string;

  @IsNotEmpty({ message: "O campo complete_name é obrigatório" })
  @IsString({ message: "O campo complete_name deve ser uma string" })
  complete_name: string;
}
