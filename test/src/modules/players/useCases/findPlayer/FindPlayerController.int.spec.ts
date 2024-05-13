import { app } from "../../../../../../src/app";
import request from "supertest";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import createDefaultUserAndGenerateJwtToken from "../../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import { createPlayers } from "../../../../../shared/matches/registerMatches";

describe("find player controller integration tests suit", () => {
  let connection: DataSource;
  let jwtToken: string;

  beforeEach(async () => {
    connection = await prepareDatabase();
    const createdUser = await createDefaultUserAndGenerateJwtToken();
    jwtToken = createdUser.jwtToken;

    await createPlayers();
  });

  afterEach(async () => {
    await dropDatabase(connection);
  });

  it("should not to be able to find a player without a token", async () => {
    const response = await request(app).get("/players").send();

    expect(response.status).toBe(401);
  });

  it("should not to be able to find a player with less than 3 letters", async () => {
    const response = await request(app)
      .get("/players")
      .query({ nicknameOrName: "Gi" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].error[0]).toBe(
      "Digite ao menos 3 letras para buscar um jogador"
    );
  });

  it("should be able to find a player", async () => {
    const response = await request(app)
      .get("/players")
      .query({ nicknameOrName: "Yur" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("complete_name");
    expect(response.body[0]).toHaveProperty("nickname");
    expect(response.body[0].nickname).toBe("Yuri Alberto");
  });

  it("should return an empty array if no players found", async () => {
    const response = await request(app)
      .get("/players")
      .query({ nicknameOrName: "Eryk" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
