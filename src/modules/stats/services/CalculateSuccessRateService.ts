import SuccessRateError from "../useCases/successRate/errors/SuccessRateError";

export default class CalculateSuccessRateService {
  public calculate(
    wins: number,
    draws: number,
    losses: number,
    numberOfMatches: number
  ): string {
    if (wins + draws + losses != numberOfMatches) {
      throw new SuccessRateError(
        "Seu total de jogos difere dos resultados registrados"
      );
    }

    return (((wins * 3 + draws * 1) / (numberOfMatches * 3)) * 100).toFixed(2);
  }
}
