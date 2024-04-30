import { User } from "../../accounts/entities/User";
import Stadium from "../../stadiums/entites/Stadium";
import WinDrawAndLossOutputDto from "../../stats/useCases/winsDrawsAndLossesUseCase/dto/WinsDrawsAndLossesOutputDto";
import { Team } from "../../teams/entities/Team";
import Tournament from "../../tournament/entities/Tournament";
import Match from "../entities/Match";
import FieldCommand from "../registerMatch/enums/FieldCommand";
import Result from "../registerMatch/enums/Result";

export default interface IMatchRepository {
  findBySeasonTournamentCommandOpponentAndUser(
    season: number,
    tournamentId: string,
    fieldCommand: FieldCommand,
    opponentId: string,
    userId: string
  ): Promise<Match | null>;

  create(
    result: Result,
    opponent: Team,
    tournament: Tournament,
    stadium: Stadium,
    fieldCommand: FieldCommand,
    yourTeamGoals: number,
    opponentTeamGoals: number,
    season: number,
    date: Date,
    user: User
  ): Promise<Match>;

  countMatchesByUserId(userId: string): Promise<number>;

  countResultsByUserId(userId: string, result: Result): Promise<number>;
}
