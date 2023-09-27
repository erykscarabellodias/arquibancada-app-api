import { validate } from "class-validator";
import Tournament from "../../entities/Tournament";
import ITournamentRepository from "../../repository/ITournamentRepository";
import CreateTournamentInputDto from "./dto/CreateTournamentInputDto";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";
import CreateTournamentError from "./errors/CreateTournamentError";

export default class CreateTournamentUseCase {
  constructor(private readonly repository: ITournamentRepository) {}

  async execute(
    createTournamentDto: CreateTournamentInputDto
  ): Promise<Tournament> {
    const dtoValidationErrors = await validate(
      plainToClass(CreateTournamentInputDto, createTournamentDto)
    );

    if (dtoValidationErrors.length > 0) {
      throw new ClassValidatorValidationError(dtoValidationErrors);
    }

    const { name } = createTournamentDto;

    const tournamentAlreadyExists = await this.repository.findByName(name);

    if (tournamentAlreadyExists) {
      throw new CreateTournamentError("Este campeonato já existe");
    }

    return await this.repository.create(createTournamentDto);
  }
}
