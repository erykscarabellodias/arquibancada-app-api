import { User } from "../../../../../src/modules/accounts/entities/User";
import MatchRepository from "../../../../../src/modules/matches/repository/implementations/MatchRepository";
import WinsDrawsAndLossesUseCase from "../../../../../src/modules/stats/useCases/winsDrawsAndLossesUseCase/WinsDrawsAndLossesUseCase";
import WinsDrawsAndLossesError from "../../../../../src/modules/stats/useCases/winsDrawsAndLossesUseCase/errors/WinsDrawsAndLossesError";
import {
  matchDoesNotExistsMock,
  matchesResultsMock,
  returnMatchMock,
} from "../../../../mocks/match/matchMocks";
import {
  returnUserMock,
  returnUserWithTeamMock,
} from "../../../../mocks/user/userMocks";

describe("wins, draws and losses use case unit tests suit", () => {
  const repository = new MatchRepository();
  const useCase = new WinsDrawsAndLossesUseCase(repository);

  it("should not to be able to find results without a user", async () => {
    let user: User;

    expect(async () => {
      await useCase.execute(user);
    }).rejects.toThrow(new WinsDrawsAndLossesError("Usuário inválido"));
  });

  it("should not to be able to find results with a user without a team", async () => {
    const user: User = returnUserMock();

    expect(async () => {
      await useCase.execute(user);
    }).rejects.toThrow(
      new WinsDrawsAndLossesError("Você ainda não selecionou um time")
    );
  });

  it("should not to be able to find results without a match registered", async () => {
    const user: User = returnUserWithTeamMock();
    repository.countMatchesByUserId = matchDoesNotExistsMock;

    expect(async () => {
      await useCase.execute(user);
    }).rejects.toThrow(
      new WinsDrawsAndLossesError("Você ainda não tem partidas cadastradas")
    );
  });

  it("should to be able to find results", async () => {
    const user: User = returnUserWithTeamMock();
    repository.countMatchesByUserId = returnMatchMock;
    repository.countResultsByUserId = matchesResultsMock;

    const results = await useCase.execute(user);

    expect(results).toHaveProperty("wins");
    expect(results).toHaveProperty("draws");
    expect(results).toHaveProperty("losses");

    expect(results.wins).toBe(17);
    expect(results.draws).toBe(5);
    expect(results.losses).toBe(2);
  });
});
