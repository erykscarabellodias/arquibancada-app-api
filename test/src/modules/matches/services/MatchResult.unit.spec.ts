import Result from "../../../../../src/modules/matches/registerMatch/enums/Result";
import MatchResult from "../../../../../src/modules/matches/services/MatchResult";

describe("match result unit tests suit", () => {
  const service = new MatchResult();
  it("if your team goals is greater than opponent goals, result is win", () => {
    const result = service.check(3, 0);

    expect(result).toBe(Result.WIN);
  });

  it("if your team goals is less than opponent goals, result is loss", () => {
    const result = service.check(0, 3);

    expect(result).toBe(Result.LOSS);
  });

  it("if your team goals is equal than opponent goals, result is loss", () => {
    const result = service.check(0, 0);

    expect(result).toBe(Result.DRAW);
  });
});
