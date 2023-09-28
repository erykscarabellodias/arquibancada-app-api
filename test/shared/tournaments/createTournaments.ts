import TournamentRepository from "../../../src/modules/tournament/repository/implementations/typeorm/TournamentRepository";

const createTournaments = async (): Promise<void> => {
  const tournamentRepository = new TournamentRepository();

  await tournamentRepository.create({ name: "Taça Libertadores da América" });
  await tournamentRepository.create({ name: "Campeonato Brasileiro" });
  await tournamentRepository.create({ name: "Copa do Brasil" });
};

export default createTournaments;
