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
import FieldCommand from "../../../../../src/modules/matches/registerMatch/enums/FieldCommand";

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

  test.each([
    {
      opponentId: "",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
      date: new Date("2016-05-16"),
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    },
    {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
      date: new Date("2016-05-16"),
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    },
    {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
      date: new Date("2016-05-16"),
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    },
    {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: null,
      yourTeamGoals: 3,
      opponentGoals: 0,
      date: new Date("2016-05-16"),
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    },
    {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: null,
      opponentGoals: 0,
      date: new Date("2016-05-16"),
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    },
    {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: null,
      date: new Date("2016-05-16"),
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    },
    {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
      date: null,
      scorers: [],
      fieldCommand: FieldCommand.HOME,
    },
    {
      opponentId: "6e9bbb89-e3ed-4562-acf2-2ce48bd9467e",
      stadiumId: "85fb581e-1464-4094-8804-a18be3bc263f",
      tournamentId: "efa8a079-d8ba-46e3-87b3-8cc29f873d21",
      season: 2016,
      yourTeamGoals: 3,
      opponentGoals: 0,
      date: new Date("2016-05-16"),
      scorers: [],
      fieldCommand: null,
    },
  ])(
    "should not to be able to register a match without mandatory fields",
    async (param) => {
      const response = await request(app)
        .post("/matches")
        .send(param)
        .set({ Authorization: `Bearer ${jwtToken}` });

      expect(response.status).toBe(400);
    }
  );
});
