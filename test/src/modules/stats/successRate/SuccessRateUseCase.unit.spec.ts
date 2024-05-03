import { User } from "../../../../../src/modules/accounts/entities/User";
import IMatchRepository from "../../../../../src/modules/matches/repository/IMatchRepository";
import MatchRepository from "../../../../../src/modules/matches/repository/implementations/MatchRepository";
import CalculateSuccessRateService from "../../../../../src/modules/stats/services/CalculateSuccessRateService";
import SuccessRateUseCase from "../../../../../src/modules/stats/useCases/successRate/SuccessRateUseCase";
import SuccessRateError from "../../../../../src/modules/stats/useCases/successRate/errors/SuccessRateError";
import { matchDoesNotExistsMock } from "../../../../mocks/match/matchMocks";
import {
  numberOfMatchesMock,
  successRateMock,
} from "../../../../mocks/stats/statsMock";
import {
  returnUserMock,
  returnUserWithTeamMock,
} from "../../../../mocks/user/userMocks";

describe("success rate use case unit tests suit", () => {
  const repository: IMatchRepository = new MatchRepository();
  const calculateSuccessRateService: CalculateSuccessRateService =
    new CalculateSuccessRateService();
  const useCase = new SuccessRateUseCase(
    repository,
    calculateSuccessRateService
  );

  it("should not to be able to find results without a user", async () => {
    let user: User;

    expect(async () => {
      await useCase.execute(user);
    }).rejects.toThrow(new SuccessRateError("Usuário inválido"));
  });

  it("should not to be able to find results with a user without a team", async () => {
    const user: User = returnUserMock();

    expect(async () => {
      await useCase.execute(user);
    }).rejects.toThrow(
      new SuccessRateError("Você ainda não selecionou um time")
    );
  });

  it("should not to be able to find results without a match registered", async () => {
    const user: User = returnUserWithTeamMock();
    repository.countMatchesByUserId = matchDoesNotExistsMock;

    expect(async () => {
      await useCase.execute(user);
    }).rejects.toThrow(
      new SuccessRateError("Você ainda não tem partidas cadastradas")
    );
  });

  it("should to be able to get success rate", async () => {
    const user: User = returnUserWithTeamMock();
    calculateSuccessRateService.calculate = successRateMock;
    repository.countMatchesByUserId = numberOfMatchesMock;
    repository.countResultsByUserId = numberOfMatchesMock;

    const result = await useCase.execute(user);

    expect(result).toHaveProperty("successRate");
    expect(result.successRate).toBe("77.78");
  });
});
