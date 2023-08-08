import { IsNotEmpty, IsString } from "class-validator";

export default class CreateTeamInputDto {
  @IsNotEmpty({ message: 'O campo "complete_name" é obrigatório' })
  @IsString({ message: 'O campo "complete_name" deve ser uma string' })
  complete_name: string;

  @IsNotEmpty({ message: 'O campo "nickname" é obrigatório' })
  @IsString({ message: 'O campo "nickname" deve ser uma string' })
  nickname: string;

  @IsNotEmpty({ message: 'O campo "state" é obrigatório' })
  @IsString({ message: 'O campo "state" deve ser uma string' })
  state: string;

  @IsNotEmpty({ message: 'O campo "city" é obrigatório' })
  @IsString({ message: 'O campo "city" deve ser uma string' })
  city: string;
}
