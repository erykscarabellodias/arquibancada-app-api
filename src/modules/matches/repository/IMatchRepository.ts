import { User } from "../../accounts/entities/User";
import Player from "../../players/entites/Player";
import Stadium from "../../stadiums/entites/Stadium";
import { Team } from "../../teams/entities/Team";
import Tournament from "../../tournament/entities/Tournament";
import Match from "../entities/Match";
import FieldCommand from "../registerMatch/enums/FieldCommand";
import ScorersExistsValidator from "../registerMatch/validators/ScorersExistsValidator";

export default interface IMatchRepository {
  findBySeasonTournamentCommandOpponentAndUser(
    season: number,
    tournamentId: string,
    fieldCommand: FieldCommand,
    opponentId: string,
    userId: string
  ): Promise<Match | null>;

  create(
    opponent: Team,
    tournament: Tournament,
    stadium: Stadium,
    fieldCommand: FieldCommand,
    yourTeamGoals: number,
    opponentTeamGoals: number,
    season: number,
    user: User
  ): Promise<Match>;
}
