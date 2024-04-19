import CreateTournamentController from "../../../../../../src/modules/tournament/useCases/createTournament/CreateTournametController";
import CreateTournamentUseCase from "../../../../../../src/modules/tournament/useCases/createTournament/CreateTournamentUseCase";
import TournamentRepository from "../../../../../../src/modules/tournament/repository/implementations/typeorm/TournamentRepository";

const createTournamentController = (): CreateTournamentController => {
  const tournamentRepository = new TournamentRepository();
  const createTournamentUseCase = new CreateTournamentUseCase(
    tournamentRepository
  );
  const controller = new CreateTournamentController(createTournamentUseCase);

  return controller;
};

export default createTournamentController();
