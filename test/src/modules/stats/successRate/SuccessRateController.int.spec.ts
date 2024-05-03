import { app } from "../../../../../src/app";
import request from "supertest";
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

describe("success rate controller integration testes suit", () => {
  it("should not to be able to get success rate without a token", async () => {
    const response = await request(app).get("/stats/success-rate").send();

    expect(response.status).toBe(401);
  });

  it("should not to be able to get success rate if user doest have a team", async () => {
    jwtToken = (await createDefaultUserAndGenerateJwtToken()).jwtToken;

    const response = await request(app)
      .get("/stats/success-rate")
      .set({ Authorization: `Bearer ${jwtToken}` })
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Você ainda não selecionou um time");
  });

  it("should be able to get success rate", async () => {
    jwtToken = await registerMatches();

    const response = await request(app)
      .get("/stats/success-rate")
      .set({ Authorization: `Bearer ${jwtToken}` })
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("successRate");
    expect(response.body.successRate).toBe("44.44");
  });
});
