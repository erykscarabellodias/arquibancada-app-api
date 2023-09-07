import { validate } from "class-validator";
import IStadiumRepository from "../../repository/IStadiumRepository";
import FindStadiumInputDto from "./dto/FindStadiumInputDto";
import FindStadiumOutputDto from "./dto/FindStadiumOutputDto";
import FindStadiumOutputMapper from "./dto/FindStadiumOutputMapper";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";

export default class FindStadiumUseCase {
  private repository: IStadiumRepository;

  constructor(repository: IStadiumRepository) {
    this.repository = repository;
  }

  async execute(
    findStadiumInputDto: FindStadiumInputDto
  ): Promise<FindStadiumOutputDto[]> {
    const dtoValidationErrors = await validate(
      plainToClass(FindStadiumInputDto, findStadiumInputDto)
    );

    if (dtoValidationErrors.length > 0) {
      throw new ClassValidatorValidationError(dtoValidationErrors);
    }

    const stadiums = await this.repository.findByName(findStadiumInputDto.name);

    return FindStadiumOutputMapper.toMap(stadiums);
  }
}
