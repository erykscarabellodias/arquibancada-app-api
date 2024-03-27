import { Repository } from "typeorm";
import Match from "../../entities/Match";
import FieldCommand from "../../registerMatch/enums/FieldCommand";
import IMatchRepository from "../IMatchRepository";
import { appDataSource } from "../../../../config/database/typeorm/data-source";

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
}
