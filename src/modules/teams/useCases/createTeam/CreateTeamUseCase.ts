import { validate } from "class-validator";
import { ITeamRepository } from "../../repository/ITeamRepository";
import CreateTeamInputDto from "./dto/CreateTeamInputDto";
import CreateTeamOutputDto from "./dto/CreateTeamOutputDto";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";
import CreateTeamError from "../../errors/CreateTeamError";
import { Team } from "../../entities/Team";

export class CreateTeamUseCase {
  private repository: ITeamRepository;

  constructor(repository: ITeamRepository) {
    this.repository = repository;
  }

  public async execute(
    createTeamDto: CreateTeamInputDto
  ): Promise<CreateTeamOutputDto> {
    const requestDataErrors = await validate(
      plainToClass(CreateTeamInputDto, createTeamDto)
    );

    if (requestDataErrors.length > 0) {
      throw new ClassValidatorValidationError(requestDataErrors);
    }

    const { complete_name, nickname, city, state } = createTeamDto;

    const teamAlreadyExists = await this.repository.checkIfExists(
      complete_name,
      nickname,
      state,
      city
    );

    if (teamAlreadyExists) {
      throw new CreateTeamError("Este time já está cadastrado");
    }

    const createdTeam = await this.repository.create(createTeamDto);

    return new CreateTeamOutputDto(createdTeam);
  }
}
