import "reflect-metadata";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { User } from "../../accounts/entities/User";
import IPlayerRepository from "../../players/entites/repository/IPlayerRepository";
import Stadium from "../../stadiums/entites/Stadium";
import IStadiumRepository from "../../stadiums/repository/IStadiumRepository";
import { Team } from "../../teams/entities/Team";
import { ITeamRepository } from "../../teams/repository/ITeamRepository";
import Tournament from "../../tournament/entities/Tournament";
import ITournamentRepository from "../../tournament/repository/ITournamentRepository";
import IMatchRepository from "../repository/IMatchRepository";
import RegisterMatchInputDto, { Scorer } from "./dto/RegisterMatchInputDto";
import RegisterMatchValidatorInterface from "./validators/RegisterMatchValidatorInterface";
import ClassValidatorValidationError from "../../../shared/errors/classValidator/ClassValidatorValidationError";
import SaveScorersDto from "./dto/SaveScorersDto";
import IMatchScorerRepository from "../repository/IMatchScorerRepository";

export default class RegisterMatchUseCase {
  constructor(
    private readonly validators: RegisterMatchValidatorInterface[],
    private readonly matchRepository: IMatchRepository,
    private readonly teamRepository: ITeamRepository,
    private readonly tournamentRepository: ITournamentRepository,
    private readonly stadiumRepository: IStadiumRepository,
    private readonly playerRepository: IPlayerRepository,
    private readonly matchScorerRepository: IMatchScorerRepository
  ) {}

  async execute(registerMatchDto: RegisterMatchInputDto, user: User) {
    const requestDataErrors = await validate(
      plainToClass(RegisterMatchInputDto, registerMatchDto)
    );

    if (requestDataErrors.length > 0) {
      throw new ClassValidatorValidationError(requestDataErrors);
    }

    for (const validator of this.validators) {
      await validator.validate(registerMatchDto, user);
    }

    const {
      opponentId,
      tournamentId,
      stadiumId,
      fieldCommand,
      opponentGoals,
      season,
      yourTeamGoals,
      scorers,
      date,
    } = registerMatchDto;

    const opponent: Team = (await this.teamRepository.findById(
      opponentId
    )) as Team;

    const tournament: Tournament = (await this.tournamentRepository.findById(
      tournamentId
    )) as Tournament;

    const stadium: Stadium = (await this.stadiumRepository.findById(
      stadiumId
    )) as Stadium;

    const match = await this.matchRepository.create(
      opponent,
      tournament,
      stadium,
      fieldCommand,
      yourTeamGoals,
      opponentGoals,
      season,
      date,
      user
    );

    const formattedScorers = await this.getFormattedScorersOfMatch(scorers);

    formattedScorers.forEach(async (scorer) => {
      await this.matchScorerRepository.registerMatchScorer(match, scorer);
    });
  }

  private async getFormattedScorersOfMatch(
    scorers: Scorer[]
  ): Promise<SaveScorersDto[]> {
    if (!scorers || scorers.length === 0) return [];

    const scorersFormattedPromises = scorers.map(async (scorer) => {
      const player = await this.playerRepository.findById(scorer.id);

      return { scorer: player!, ownGoal: scorer.ownGoal };
    });

    const scorersFormatted: SaveScorersDto[] = await Promise.all(
      scorersFormattedPromises
    );

    return scorersFormatted;
  }
}
