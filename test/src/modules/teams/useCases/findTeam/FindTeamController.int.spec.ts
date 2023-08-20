import { app } from "../../../../../../src/app";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import createDefaultUserAndGenerateJwtToken from "../../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import createTeams from "../../../../../shared/teams/createTeams";
import request from "supertest";

let connection: DataSource;
let jwtToken: string;

beforeAll(async () => {
  connection = await prepareDatabase();
  jwtToken = await createDefaultUserAndGenerateJwtToken();
  await createTeams();
});

afterAll(async () => {
  await dropDatabase(connection);
});

describe("find team controller integration tests", () => {
  it("should be able to find a team with 3 letters", async () => {
    const response = await request(app)
      .get("/teams")
      .query({ name: "Cor" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("complete_name");
  });

  it("should be able to find a team by complete name", async () => {
    const response = await request(app)
      .get("/teams")
      .query({ name: "Paulista" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].complete_name).toBe(
      "Sport Club Corinthians Paulista"
    );
  });

  it("should return a empty list if no teams match the searched name", async () => {
    const response = await request(app)
      .get("/teams")
      .query({ name: "Athletico" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("should not be able to search a team with less than 3 letters", async () => {
    const response = await request(app)
      .get("/teams")
      .query({ name: "At" })
      .send()
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].error[0]).toBe(
      "Você deve enviar no mínimo três caracteres no campo nome"
    );
  });

  it("should not be able to search a without a valid token", async () => {
    const response = await request(app)
      .get("/teams")
      .query({ name: "Athletico" })
      .send();

    expect(response.status).toBe(401);
  });
});
