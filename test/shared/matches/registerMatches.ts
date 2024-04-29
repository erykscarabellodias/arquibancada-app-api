import RegisterMatchInputDto from "../../../src/modules/matches/registerMatch/dto/RegisterMatchInputDto";
import FieldCommand from "../../../src/modules/matches/registerMatch/enums/FieldCommand";
import Result from "../../../src/modules/matches/registerMatch/enums/Result";
import MatchRepository from "../../../src/modules/matches/repository/implementations/MatchRepository";
import Player from "../../../src/modules/players/entites/Player";
import PlayerRepository from "../../../src/modules/players/entites/repository/implementations/PlayerRepository";
import { CreatePlayerInputDto } from "../../../src/modules/players/useCases/createPlayer/dto/CreatePlayerInputDto";
import { Team } from "../../../src/modules/teams/entities/Team";
import createDefaultUserWithTeamAndGenerateJwtToken from "../authentication/createDefaultUserWithTeamAndGenerateJwtToken";
import createStadiums from "../stadiums/createStadiums";
import createTeams from "../teams/createTeams";
import createTournaments from "../tournaments/createTournaments";

const registerMatches = async (): Promise<string> => {
  const userCreated = await createDefaultUserWithTeamAndGenerateJwtToken();
  const teams: Team[] = await createTeams();
  const stadium = await createStadiums();
  const tournament = await createTournaments();
  const players = await createPlayers();

  const matchesRepository: MatchRepository = new MatchRepository();

  const match1: RegisterMatchInputDto = {
    date: new Date("2023-01-01"),
    fieldCommand: FieldCommand.HOME,
    opponentGoals: 1,
    yourTeamGoals: 3,
    opponentId: teams[1].id,
    season: 2023,
    stadiumId: stadium.id,
    tournamentId: tournament.id,
    scorers: [
      { id: players[0].id, ownGoal: false },
      { id: players[1].id, ownGoal: false },
      { id: players[2].id, ownGoal: false },
    ],
  };

  const match2: RegisterMatchInputDto = {
    date: new Date("2023-01-01"),
    fieldCommand: FieldCommand.HOME,
    opponentGoals: 1,
    yourTeamGoals: 1,
    opponentId: teams[2].id,
    season: 2023,
    stadiumId: stadium.id,
    tournamentId: tournament.id,
    scorers: [{ id: players[3].id, ownGoal: false }],
  };

  const match3: RegisterMatchInputDto = {
    date: new Date("2023-01-01"),
    fieldCommand: FieldCommand.HOME,
    opponentGoals: 0,
    yourTeamGoals: 1,
    opponentId: teams[3].id,
    season: 2023,
    stadiumId: stadium.id,
    tournamentId: tournament.id,
    scorers: [],
  };

  await matchesRepository.create(
    Result.WIN,
    teams[1],
    tournament,
    stadium,
    match1.fieldCommand,
    match1.yourTeamGoals,
    match1.opponentGoals,
    match1.season,
    match1.date,
    userCreated.user
  );
  await matchesRepository.create(
    Result.DRAW,
    teams[2],
    tournament,
    stadium,
    match2.fieldCommand,
    match2.yourTeamGoals,
    match2.opponentGoals,
    match2.season,
    match2.date,
    userCreated.user
  );
  await matchesRepository.create(
    Result.LOSS,
    teams[3],
    tournament,
    stadium,
    match3.fieldCommand,
    match3.yourTeamGoals,
    match3.opponentGoals,
    match3.season,
    match3.date,
    userCreated.user
  );

  return userCreated.jwtToken;
};

const createPlayers = async (): Promise<Player[]> => {
  const playersRepository: PlayerRepository = new PlayerRepository();

  const gil: CreatePlayerInputDto = {
    complete_name: "Carlos Gilberto Nascimento da Silva",
    nickname: "Gil",
  };

  const yuri: CreatePlayerInputDto = {
    complete_name: "Yuri Alberto Monteiro da Silva",
    nickname: "Yuri Alberto",
  };

  const wesley: CreatePlayerInputDto = {
    complete_name: "Wesley Gassova Ribeiro Teixeira",
    nickname: "Wesley",
  };

  const danilo: CreatePlayerInputDto = {
    complete_name: "Danilo Gabriel de Andrade",
    nickname: "Danilo",
  };

  const createdGil = await playersRepository.create(
    gil.nickname,
    gil.complete_name
  );

  const createdYuri = await playersRepository.create(
    yuri.nickname,
    yuri.complete_name
  );

  const createdWesley = await playersRepository.create(
    wesley.nickname,
    wesley.complete_name
  );

  const createdDanilo = await playersRepository.create(
    danilo.nickname,
    danilo.complete_name
  );

  return [createdGil, createdYuri, createdWesley, createdDanilo];
};

export { registerMatches };
