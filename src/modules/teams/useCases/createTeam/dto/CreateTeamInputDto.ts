import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateTeamInputDto {
  @IsNotEmpty({ message: 'O campo "complete_name" é obrigatório' })
  @IsString({ message: 'O campo "complete_name" deve ser uma string' })
  complete_name: string;

  @IsNotEmpty({ message: 'O campo "nickname" é obrigatório' })
  @IsString({ message: 'O campo "nickname" deve ser uma string' })
  nickname: string;

  @IsOptional()
  @IsString({ message: 'O campo "state" deve ser uma string' })
  state?: string;

  @IsNotEmpty({ message: 'O campo "city" é obrigatório' })
  @IsString({ message: 'O campo "city" deve ser uma string' })
  city: string;

  @IsOptional()
  @IsString({ message: 'O campo "country" deve ser uma string' })
  country?: string;

  @IsNotEmpty({ message: 'O campo "isForeigner" é obrigatório' })
  @IsBoolean({ message: 'O campo "isForeigner" deve ser um booleano' })
  isForeigner: boolean;
}
