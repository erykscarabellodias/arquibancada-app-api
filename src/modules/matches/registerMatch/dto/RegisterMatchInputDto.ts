import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";
import FieldCommand from "../enums/FieldCommand";
import { Type } from "class-transformer";

export default class RegisterMatchInputDto {
  @IsString({ message: "O campo opponentId deve ser uma string" })
  @IsNotEmpty({ message: "O campo opponentId é obrigatório" })
  opponentId: string;

  @IsString({ message: "O campo tournamentId deve ser uma string" })
  @IsNotEmpty({ message: "O campo tournamentId é obrigatório" })
  tournamentId: string;

  @IsInt({ message: "O campo season deve ser um inteiro" })
  @IsNotEmpty({ message: "O campo season é obrigatório" })
  season: number;

  @IsEnum(FieldCommand, {
    message:
      "O campo fieldCommand deve conter os valores Mandante, Visitante ou Neutro",
  })
  @IsNotEmpty({ message: "O campo fieldCommand é obrigatório" })
  fieldCommand: FieldCommand;

  @IsString({ message: "O campo stadiumId deve ser uma string" })
  @IsNotEmpty({ message: "O campo stadiumId é obrigatório" })
  stadiumId: string;

  @IsInt({ message: "O campo yourTeamGoals deve ser um inteiro" })
  @IsNotEmpty({ message: "O campo yourTeamGoals é obrigatório" })
  yourTeamGoals: number;

  @IsInt({ message: "O campo opponentGoals deve ser um inteiro" })
  @IsNotEmpty({ message: "O campo opponentGoals é obrigatório" })
  opponentGoals: number;

  @IsNotEmpty({ message: "O campo date é obrigatório" })
  @IsDate({ message: "O campo date deve ser uma data válida" })
  date: Date;

  @IsArray({
    message: "O campo scorers deve ser um array",
  })
  @Type(() => Scorer)
  scorers: Scorer[];
}

export class Scorer {
  id: string;
  ownGoal: boolean;
}
