import Tournament from "../entities/Tournament";
import CreateTournamentInputDto from "../useCases/createTournament/dto/CreateTournamentInputDto";

export default interface ITournamentRepository {
  create(
    createTournamentInputDto: CreateTournamentInputDto
  ): Promise<Tournament>;

  findByName(name: string): Promise<Tournament | null>;

  list(): Promise<Tournament[]>;
}
