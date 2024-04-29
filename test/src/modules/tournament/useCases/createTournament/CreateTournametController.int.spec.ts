import { app } from "../../../../../../src/app";
import request from "supertest";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import createDefaultUserAndGenerateJwtToken from "../../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";

describe("create tournament integration tests suit", () => {
  let connection: DataSource;
  let tokenJwt: string;

  beforeEach(async () => {
    connection = await prepareDatabase();
    const createdUser = await createDefaultUserAndGenerateJwtToken();
    tokenJwt = createdUser.jwtToken;
  });

  afterEach(async () => {
    await dropDatabase(connection);
  });

  it("should be able to create a tournament", async () => {
    const response = await request(app)
      .post("/tournaments")
      .send({ name: "Paulistão" })
      .set({ Authorization: `Bearer ${tokenJwt}` });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("created_at");
  });

  it("should not to able to create a tournament without a token", async () => {
    const response = await request(app)
      .post("/tournaments")
      .send({ name: "Paulistão" });

    expect(response.status).toBe(401);
  });

  it("should not to able to create a same tournament twice", async () => {
    await request(app)
      .post("/tournaments")
      .send({ name: "Paulistão" })
      .set({ Authorization: `Bearer ${tokenJwt}` });

    const response = await request(app)
      .post("/tournaments")
      .send({ name: "Paulistão" })
      .set({ Authorization: `Bearer ${tokenJwt}` });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Este campeonato já existe");
  });

  it("should not to able to create a tournament without a name", async () => {
    const response = await request(app)
      .post("/tournaments")
      .send({ name: "" })
      .set({ Authorization: `Bearer ${tokenJwt}` });

    expect(response.status).toBe(400);
  });
});
