import ListTournamentsController from "./ListTournamentsController";
import TournamentRepository from "../../repository/implementations/typeorm/TournamentRepository";
import ListTournamentsUseCase from "./ListTournamentsUseCase";

const listTournaments = (): ListTournamentsController => {
  const repository = new TournamentRepository();
  const useCase = new ListTournamentsUseCase(repository);
  const controller = new ListTournamentsController(useCase);

  return controller;
};

export default listTournaments();
