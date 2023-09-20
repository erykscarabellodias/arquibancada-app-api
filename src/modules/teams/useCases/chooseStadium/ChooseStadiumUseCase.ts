import { validate } from "class-validator";
import CheckIfUserHaveATeamService from "../../../accounts/services/CheckIfUserHaveATeam.service";
import IStadiumRepository from "../../../stadiums/repository/IStadiumRepository";
import CheckIfUserTeamHaveAStadiumService from "../../../stadiums/services/CheckIfUserTeamHaveAStadium.service";
import { ITeamRepository } from "../../repository/ITeamRepository";
import ChooseStadiumInputDto from "./dto/ChooseStadiumInputDto";
import ChooseStadiumError from "./errors/ChooseStadiumError";
import { plainToClass } from "class-transformer";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";

export default class ChooseStadiumUseCase {
  constructor(
    private readonly teamRepository: ITeamRepository,
    private readonly stadiumRepository: IStadiumRepository,
    private readonly checkIfUserHaveATeamService: CheckIfUserHaveATeamService,
    private readonly checkIfUserTeamHaveAStadiumService: CheckIfUserTeamHaveAStadiumService
  ) {
    this.teamRepository = teamRepository;
    this.stadiumRepository = stadiumRepository;
  }

  public async execute(dto: ChooseStadiumInputDto): Promise<void> {
    const validationErrors = await validate(
      plainToClass(ChooseStadiumInputDto, dto)
    );

    if (validationErrors.length > 0) {
      throw new ClassValidatorValidationError(validationErrors);
    }

    const { stadiumId, user } = dto;

    const userHaveATeam =
      this.checkIfUserHaveATeamService.checkIfUserHaveATeam(user);

    if (!userHaveATeam) {
      throw new ChooseStadiumError(
        "Escolha um time antes de escolher um estádio"
      );
    }

    const userTeamAlreadyHaveAStadium =
      this.checkIfUserTeamHaveAStadiumService.checkIfUserTeamHaveAStadium(user);

    if (userTeamAlreadyHaveAStadium) {
      throw new ChooseStadiumError("Seu time já tem um estádio cadastrado");
    }

    const stadium = await this.stadiumRepository.findById(stadiumId);

    if (!stadium) {
      throw new ChooseStadiumError("Este estádio não existe");
    }

    const userTeam = await this.teamRepository.findById(user.team!.id);

    if (!userTeam) {
      throw new ChooseStadiumError("O time vinculado ao seu perfil não existe");
    }

    await this.teamRepository.chooseStadium(userTeam, stadium);
  }
}
