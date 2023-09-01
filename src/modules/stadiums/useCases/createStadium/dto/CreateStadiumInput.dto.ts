import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export default class CreateStadiumInputDto {
  @IsString({ message: 'O campo "name" é deve ser uma string' })
  @IsNotEmpty({ message: 'O campo "name" é obrigatório' })
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'O campo "public_capacity" é deve ser um inteiro' }
  )
  @IsPositive({
    message: 'O campo "public_capacity" deve ter um valor positivo',
  })
  @IsNotEmpty({ message: 'O campo "public_capacity" é obrigatório' })
  public_capacity: number;
}
