import { IsString, IsNotEmpty, IsEmail, Validate } from "class-validator";
import { SecurePasswordValidator } from "../../../../../shared/security/password/SecurePasswordValidator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'O campo "nome" é obrigatório' })
  @IsString({ message: "O nome deve ser uma string" })
  name: string;

  @IsNotEmpty({ message: 'O campo "email" é obrigatório' })
  @IsEmail({}, { message: "O email não é válido" })
  email: string;

  @IsNotEmpty({ message: 'O campo "senha" é obrigatório' })
  @Validate(SecurePasswordValidator)
  password: string;
}
