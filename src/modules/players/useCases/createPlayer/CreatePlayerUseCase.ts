import { validate } from "class-validator";
import IPlayerRepository from "../../entites/repository/IPlayerRepository";
import { CreatePlayerError } from "../../errors/CreatePlayerError";
import { CreatePlayerInputDto } from "./dto/CreatePlayerInputDto";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";

export default class CreatePlayerUseCase {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(createPlayerInputDto: CreatePlayerInputDto) {
    const { nickname, complete_name } = createPlayerInputDto;

    const classValidatorValidationErrors = await validate(
      plainToClass(CreatePlayerInputDto, createPlayerInputDto)
    );

    if (classValidatorValidationErrors.length > 0) {
      throw new ClassValidatorValidationError(classValidatorValidationErrors);
    }

    const playerAlreadyExists =
      await this.playerRepository.findByNicknameAndCompleteName(
        nickname,
        complete_name
      );

    if (playerAlreadyExists) {
      throw new CreatePlayerError("Este jogador já está cadastrado");
    }

    return await this.playerRepository.create(nickname, complete_name);
  }
}
