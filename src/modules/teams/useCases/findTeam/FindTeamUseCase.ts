import { validate } from "class-validator";
import { ITeamRepository } from "../../repository/ITeamRepository";
import { FindTeamInputDto } from "./dto/FindTeamInputDto";
import { TeamsOutputMapperDto } from "./dto/TeamsOutputMapper";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";
import { FindTeamOutputDto } from "./dto/FindTeamOutputDto";

export default class FindTeamUseCase {
  private repository: ITeamRepository;

  public constructor(repository: ITeamRepository) {
    this.repository = repository;
  }

  public async execute(
    findTeamInputDto: FindTeamInputDto
  ): Promise<FindTeamOutputDto[]> {
    const requestDataErrors = await validate(
      plainToClass(FindTeamInputDto, findTeamInputDto)
    );

    if (requestDataErrors.length > 0) {
      throw new ClassValidatorValidationError(requestDataErrors);
    }

    const teams = await this.repository.findByName(findTeamInputDto.name);

    const teamsMapped = TeamsOutputMapperDto.toMap(teams);

    return teamsMapped;
  }
}
