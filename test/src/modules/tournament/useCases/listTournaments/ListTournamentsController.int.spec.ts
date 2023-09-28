import { app } from "../../../../../../src/app";
import request from "supertest";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import createDefaultUserAndGenerateJwtToken from "../../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import createTournaments from "../../../../../shared/tournaments/createTournaments";

describe("list tournaments controller integration tests suit", () => {
  let connection: DataSource;
  let jwtToken: string;

  beforeEach(async () => {
    connection = await prepareDatabase();
    jwtToken = await createDefaultUserAndGenerateJwtToken();
    await createTournaments();
  });

  afterEach(async () => {
    await dropDatabase(connection);
  });

  it("should be able to list tournaments", async () => {
    const response = await request(app)
      .get("/tournaments")
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  it("list tournaments should stay ordered by name", async () => {
    const response = await request(app)
      .get("/tournaments")
      .set({ Authorization: `Bearer ${jwtToken}` });

    const tournaments = response.body;

    expect(tournaments).toStrictEqual(
      [...tournaments].sort((a, b) => a.name.localeCompare(b.name))
    );
  });

  it("should not to be able to list tournaments without a token", async () => {
    const response = await request(app).get("/tournaments");

    expect(response.status).toBe(401);
  });
});
