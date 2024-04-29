import { app } from "../../../../../../src/app";
import request from "supertest";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import createDefaultUserAndGenerateJwtToken from "../../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import createStadiums from "../../../../../shared/stadiums/createStadiums";

describe("find stadium controller integration tests suit", () => {
  let connection: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    connection = await prepareDatabase();
    const createdUser = await createDefaultUserAndGenerateJwtToken();
    jwtToken = createdUser.jwtToken;
    await createStadiums();
  });

  afterAll(async () => {
    await dropDatabase(connection);
  });

  it("should be able to find stadium by name", async () => {
    const response = await request(app)
      .get("/stadiums")
      .query({ name: "arena" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("public_capacity");
  });

  it("should return an empty list if none stadiums match the searched name", async () => {
    const response = await request(app)
      .get("/stadiums")
      .query({ name: "maracanã" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("should not be able to find a with less than 3 letters", async () => {
    const response = await request(app)
      .get("/stadiums")
      .query({ name: "ne" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].error[0]).toBe(
      "Você deve enviar no mínimo três caracteres no campo nome"
    );
  });

  it("should not be able to find a stadium without a valid token", async () => {
    const response = await request(app)
      .get("/stadiums")
      .query({ name: "maracanã" })
      .send();

    expect(response.status).toBe(401);
  });
});
