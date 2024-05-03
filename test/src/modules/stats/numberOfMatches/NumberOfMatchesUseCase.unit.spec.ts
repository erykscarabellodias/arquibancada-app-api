import { User } from "../../../../../src/modules/accounts/entities/User";
import IMatchRepository from "../../../../../src/modules/matches/repository/IMatchRepository";
import MatchRepository from "../../../../../src/modules/matches/repository/implementations/MatchRepository";
import NumberOfMatchesError from "../../../../../src/modules/stats/useCases/numberOfMatches/errors/NumberOfMatchesError";
import NumberOfMatchesUseCase from "../../../../../src/modules/stats/useCases/numberOfMatches/NumberOfMatchesUseCase";
import { numberOfMatchesMock } from "../../../../mocks/stats/statsMock";
import {
  returnUserMock,
  returnUserWithTeamMock,
} from "../../../../mocks/user/userMocks";

describe("number of matches use case tests suit", () => {
  const repository: IMatchRepository = new MatchRepository();
  const useCase = new NumberOfMatchesUseCase(repository);
  repository.countMatchesByUserId = numberOfMatchesMock;

  it("should not to be able to count number of matches without a user", () => {
    let user: User;

    expect(async () => {
      await useCase.execute(user);
    }).rejects.toThrow(new NumberOfMatchesError("Este usuário não existe"));
  });

  it("should not to be able to count number of matches with a user without a team", () => {
    const user: User = returnUserMock();

    expect(async () => {
      await useCase.execute(user);
    }).rejects.toThrow(
      new NumberOfMatchesError("Este usuário ainda não escolheu um time")
    );
  });

  it("should to be able to count the number of matches of user", async () => {
    const user: User = returnUserWithTeamMock();
    repository.findBySeasonTournamentCommandOpponentAndUser =
      numberOfMatchesMock;

    const result = await useCase.execute(user);

    expect(result).toHaveProperty("numberOfMatches");
    expect(result.numberOfMatches).toBe(24);
  });
});
