import { validate } from "class-validator";
import { TeamRepository } from "../../../teams/repository/implementations/typeorm/TeamRespository";
import ChooseTeamInputDto from "./dto/ChooseTeamInputDto";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";
import ChooseTeamError from "./errors/ChooseTeamError";
import { UserRepository } from "../../repositories/implementations/typeorm/UserRepository";
import { User } from "../../entities/User";

export default class ChooseTeamUseCase {
  private teamRepository: TeamRepository;
  private userRepository: UserRepository;

  constructor(teamRepository: TeamRepository, userRepository: UserRepository) {
    this.teamRepository = teamRepository;
    this.userRepository = userRepository;
  }

  async execute(chooseTeamDto: ChooseTeamInputDto): Promise<User> {
    const requestDataErrors = await validate(
      plainToClass(ChooseTeamInputDto, chooseTeamDto)
    );

    if (requestDataErrors.length > 0) {
      throw new ClassValidatorValidationError(requestDataErrors);
    }

    const { user, teamId } = chooseTeamDto;

    const team = await this.teamRepository.findById(teamId);

    if (!team) {
      throw new ChooseTeamError("Este time não existe");
    }

    if (user.team !== null) {
      throw new ChooseTeamError("Este usuário já torce para um time");
    }

    const userWithTeam = await this.userRepository.chooseTeam(user, team);

    return userWithTeam;
  }
}
