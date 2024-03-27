import { User } from "../../../accounts/entities/User";
import IStadiumRepository from "../../../stadiums/repository/IStadiumRepository";
import RegisterMatchInputDto from "../dto/RegisterMatchInputDto";
import RegisterMatchError from "../errors/RegisterMatchError";
import RegisterMatchValidatorInterface from "./RegisterMatchValidatorInterface";

export class StadiumExistsValidator implements RegisterMatchValidatorInterface {
  constructor(private readonly stadiumRepository: IStadiumRepository) {}

  async validate(dto: RegisterMatchInputDto, user: User): Promise<void> {
    const stadium = await this.stadiumRepository.findById(dto.stadiumId);

    if (!stadium) {
      throw new RegisterMatchError("O estádio enviado não existe");
    }
  }
}
