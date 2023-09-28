import TournamentRepository from "../../../../../../src/modules/tournament/repository/implementations/typeorm/TournamentRepository";
import ListTournamentsUseCase from "../../../../../../src/modules/tournament/useCases/listTournaments/ListTournamentsUseCase";
import { tournamentsList } from "../../../../../mocks/tournament/tournamentMocks";

describe("list tournaments use case unit tests suit", () => {
  const repository = new TournamentRepository();
  const useCase = new ListTournamentsUseCase(repository);

  it("should be able to list tournaments", async () => {
    repository.list = tournamentsList;

    const tournaments = await useCase.execute();

    expect(tournaments).toHaveLength(3);
    expect(tournaments[0]).toHaveProperty("id");
    expect(tournaments[0]).toHaveProperty("name");
    expect(tournaments[0]).toHaveProperty("created_at");
  });

  it("list tournaments should stay ordered by name", async () => {
    repository.list = tournamentsList;

    const tournaments = await useCase.execute();

    expect(tournaments).toStrictEqual(
      [...tournaments].sort((a, b) => a.name.localeCompare(b.name))
    );
  });
});
