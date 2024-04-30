import request from "supertest";
import { app } from "../../../../../src/app";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../shared/dropDatabase";
import createDefaultUserAndGenerateJwtToken from "../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import { registerMatches } from "../../../../shared/matches/registerMatches";

let connection: DataSource;
let jwtToken: string;

beforeEach(async () => {
  connection = await prepareDatabase();
});

afterEach(async () => {
  await dropDatabase(connection);
});

describe("wins, draws and losses controller integration tests suit", () => {
  it("should not to be able to count wins, draws and losses without a token", async () => {
    const response = await request(app)
      .get("/stats/wins-draws-and-losses")
      .send();

    expect(response.status).toBe(401);
  });

  it("should not to be able to count wins, draws and losses if user doest have a team", async () => {
    jwtToken = (await createDefaultUserAndGenerateJwtToken()).jwtToken;

    const response = await request(app)
      .get("/stats/wins-draws-and-losses")
      .set({ Authorization: `Bearer ${jwtToken}` })
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Você ainda não selecionou um time");
  });

  it("should to be able to count wins, draws and losses", async () => {
    jwtToken = await registerMatches();

    const response = await request(app)
      .get("/stats/wins-draws-and-losses")
      .set({ Authorization: `Bearer ${jwtToken}` })
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("wins");
    expect(response.body).toHaveProperty("draws");
    expect(response.body).toHaveProperty("losses");

    expect(response.body.wins).toBe(1);
    expect(response.body.draws).toBe(1);
    expect(response.body.losses).toBe(1);
  });
});
