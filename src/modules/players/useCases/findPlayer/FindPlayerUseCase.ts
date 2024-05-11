import { validate } from "class-validator";
import Player from "../../entites/Player";
import IPlayerRepository from "../../entites/repository/IPlayerRepository";
import FindPlayerInputDto from "./dto/FindPlayerInputDto";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";

export default class FindPlayerUseCase {
  constructor(private readonly playerRepository: IPlayerRepository) {}

  async execute(findPlayerInputDto: FindPlayerInputDto): Promise<Player[]> {
    const requestDataErrors = await validate(
      plainToClass(FindPlayerInputDto, findPlayerInputDto)
    );

    if (requestDataErrors.length > 0) {
      throw new ClassValidatorValidationError(requestDataErrors);
    }

    const players = await this.playerRepository.findByNicknameOrName(
      findPlayerInputDto.nicknameOrName
    );

    if (!players) {
      return [];
    }

    return players;
  }
}
