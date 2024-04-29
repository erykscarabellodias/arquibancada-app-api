import request from "supertest";
import { app } from "../../../../src/app";
import { prepareDatabase } from "../../../shared/prepareDatabase";
import { dropDatabase } from "../../../shared/dropDatabase";
import { DataSource } from "typeorm";
import { registerMatches } from "../../../shared/matches/registerMatches";
import createDefaultUserAndGenerateJwtToken from "../../../shared/authentication/createDefaultUserAndGenerateJwtToken";

let connection: DataSource;
let jwtToken: string;

beforeEach(async () => {
  connection = await prepareDatabase();
});

afterEach(async () => {
  await dropDatabase(connection);
});

describe("number of matches controller integration tests suit", () => {
  it("should not to be able to check number of matches without a token", async () => {
    const response = await request(app).get("/stats/number-of-matches").send();

    expect(response.status).toBe(401);
  });

  it("should not to be able to check number of matches of a user without a team", async () => {
    jwtToken = (await createDefaultUserAndGenerateJwtToken()).jwtToken;

    const response = await request(app)
      .get("/stats/number-of-matches")
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Este usuário ainda não escolheu um time"
    );
  });

  it("should to be able to check number of matches", async () => {
    jwtToken = await registerMatches();
    const response = await request(app)
      .get("/stats/number-of-matches")
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("numberOfMatches");
    expect(response.body.numberOfMatches).toBe(3);
  });
});
