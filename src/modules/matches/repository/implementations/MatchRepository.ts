import { Repository } from "typeorm";
import Match from "../../entities/Match";
import FieldCommand from "../../registerMatch/enums/FieldCommand";
import IMatchRepository from "../IMatchRepository";
import { appDataSource } from "../../../../config/database/typeorm/data-source";
import Stadium from "../../../stadiums/entites/Stadium";
import { Team } from "../../../teams/entities/Team";
import Tournament from "../../../tournament/entities/Tournament";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../../accounts/entities/User";
import Player from "../../../players/entites/Player";

export default class MatchRepository implements IMatchRepository {
  private repository: Repository<Match>;

  constructor() {
    this.repository = appDataSource.getRepository(Match);
  }

  async findBySeasonTournamentCommandOpponentAndUser(
    season: number,
    tournamentId: string,
    fieldCommand: FieldCommand,
    opponentId: string,
    userId: string
  ): Promise<Match | null> {
    return this.repository.findOne({
      where: {
        season,
        tournament: { id: tournamentId },
        fieldCommand,
        opponent: { id: opponentId },
        user: { id: userId },
      },
    });
  }

  async create(
    opponent: Team,
    tournament: Tournament,
    stadium: Stadium,
    fieldCommand: FieldCommand,
    yourTeamGoals: number,
    opponentTeamGoals: number,
    season: number,
    date: Date,
    user: User
  ): Promise<Match> {
    return this.repository.save({
      id: uuidV4(),
      opponent,
      tournament,
      stadium,
      season,
      fieldCommand,
      yourTeamGoals,
      opponentTeamGoals,
      date,
      user,
    });
  }
}
