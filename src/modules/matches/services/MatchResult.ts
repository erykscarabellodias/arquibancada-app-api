import Result from "../registerMatch/enums/Result";

export default class MatchResult {
  check(yourTeamGoals: number, opponentGoals: number): Result {
    if (yourTeamGoals > opponentGoals) {
      return Result.WIN;
    }

    if (yourTeamGoals < opponentGoals) {
      return Result.LOSS;
    }

    return Result.DRAW;
  }
}
