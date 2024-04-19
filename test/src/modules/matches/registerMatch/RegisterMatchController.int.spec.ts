import { app } from "../../../../../src/app";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../shared/dropDatabase";
import createTeams from "../../../../shared/teams/createTeams";
import { Team } from "../../../../../src/modules/teams/entities/Team";
import Stadium from "../../../../../src/modules/stadiums/entites/Stadium";
import Tournament from "../../../../../src/modules/tournament/entities/Tournament";
import createStadiums from "../../../../shared/stadiums/createStadiums";
import createTournaments from "../../../../shared/tournaments/createTournaments";
import request from "supertest";
import createDefaultUserWithTeamAndGenerateJwtToken from "../../../../shared/authentication/createDefaultUserWithTeamAndGenerateJwtToken";

describe("register match controller integration tests suit", () => {
  let connection: DataSource;
  let jwtToken: string;
  let stadium: Stadium;
  let tournament: Tournament;
  let coritiba: Team;

  beforeEach(async () => {
    connection = await prepareDatabase();
    jwtToken = await createDefaultUserWithTeamAndGenerateJwtToken();
    stadium = await createStadiums();
    tournament = await createTournaments();

    const teamsCreated = await createTeams();
    coritiba = teamsCreated[1];
  });

  afterEach(async () => {
    await dropDatabase(connection);
  });

  it("should not to be able to create a match without a token", async () => {
    const response = await request(app).post("/matches").send({
      opponentId: coritiba.id,
      tournamentId: tournament.id,
      stadiumId: stadium.id,
      season: 2016,
      fieldCommand: "Mandante",
      yourTeamGoals: 0,
      opponentGoals: 0,
      scorers: [],
    });

    expect(response.status).toBe(401);
  });

  it("should be able to create a match", async () => {
    const response = await request(app)
      .post("/matches")
      .send({
        opponentId: coritiba.id,
        tournamentId: tournament.id,
        stadiumId: stadium.id,
        season: 2016,
        fieldCommand: "Mandante",
        yourTeamGoals: 0,
        opponentGoals: 0,
        date: "2016-01-01",
        scorers: [],
      })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(201);
  });
});
