import { validate } from "class-validator";
import Stadium from "../../entites/Stadium";
import CreateStadiumError from "../../errors/CreateStadiumError";
import IStadiumRepository from "../../repository/IStadiumRepository";
import CreateStadiumInputDto from "./dto/CreateStadiumInput.dto";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";

export default class CreateStadiumUseCase {
  private repository: IStadiumRepository;

  constructor(stadiumRepository: IStadiumRepository) {
    this.repository = stadiumRepository;
  }

  async execute(
    createStadiumInputDto: CreateStadiumInputDto
  ): Promise<Stadium> {
    const { name, public_capacity } = createStadiumInputDto;

    const classValidatorValidationErrors = await validate(
      plainToClass(CreateStadiumInputDto, createStadiumInputDto)
    );

    if (classValidatorValidationErrors.length > 0) {
      throw new ClassValidatorValidationError(classValidatorValidationErrors);
    }

    const stadiumAlreadyExists = await this.repository.findByExactName(name);

    if (stadiumAlreadyExists) {
      throw new CreateStadiumError("Este estádio já está cadastrado");
    }

    const createdStadium = await this.repository.create({
      name,
      public_capacity,
    });

    return createdStadium;
  }
}
