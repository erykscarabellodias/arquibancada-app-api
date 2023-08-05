import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthInputDto {
  @IsNotEmpty({ message: 'O campo "email" é obrigatório' })
  @IsEmail({}, { message: "O email não é válido" })
  email: string;

  @IsNotEmpty({ message: 'O campo "senha" é obrigatório' })
  password: string;
}
