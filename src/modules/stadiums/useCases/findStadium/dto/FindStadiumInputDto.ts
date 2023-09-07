import { IsNotEmpty, IsString, MinLength } from "class-validator";

export default class FindStadiumInputDto {
  @IsNotEmpty({ message: "O campo nome é obrigatório" })
  @IsString({ message: "O campo nome deve ser uma string" })
  @MinLength(3, {
    message: "Você deve enviar no mínimo três caracteres no campo nome",
  })
  name: string;
}
