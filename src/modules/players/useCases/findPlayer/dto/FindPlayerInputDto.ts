import { IsNotEmpty, IsString, MinLength } from "class-validator";

export default class FindPlayerInputDto {
  @IsString({ message: "O campo nicknameOrName deve ser uma string" })
  @IsNotEmpty({ message: "O campo nicknameOrName é obrigatório" })
  @MinLength(3, {
    message: "Digite ao menos 3 letras para buscar um jogador",
  })
  nicknameOrName: string;
}
