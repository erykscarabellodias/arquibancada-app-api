import Tournament from "../../entities/Tournament";
import ITournamentRepository from "../../repository/ITournamentRepository";

export default class ListTournamentsUseCase {
  constructor(private readonly tournamentRepository: ITournamentRepository) {}

  async execute(): Promise<Tournament[]> {
    const tournaments = await this.tournamentRepository.list();

    return tournaments;
  }
}
