import Match from "../entities/Match";
import FieldCommand from "../registerMatch/enums/FieldCommand";

export default interface IMatchRepository {
  findBySeasonTournamentCommandOpponentAndUser(
    season: number,
    tournamentId: string,
    fieldCommand: FieldCommand,
    opponentId: string,
    userId: string
  ): Promise<Match | null>;
}
