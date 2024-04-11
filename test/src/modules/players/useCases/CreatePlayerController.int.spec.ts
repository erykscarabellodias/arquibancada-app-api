import { app } from "../../../../../src/app";
import { prepareDatabase } from "../../../../shared/prepareDatabase";
import { DataSource } from "typeorm";
import createDefaultUserAndGenerateJwtToken from "../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import { dropDatabase } from "../../../../shared/dropDatabase";
import request from "supertest";

describe("create player integration tests suit", () => {
  let connection: DataSource;
  let jwtToken: string;

  beforeEach(async () => {
    connection = await prepareDatabase();
    jwtToken = await createDefaultUserAndGenerateJwtToken();
  });

  afterEach(async () => {
    await dropDatabase(connection);
  });

  it("should not to be able to create a player without nickname", async () => {
    const response = await request(app)
      .post("/players")
      .send({ complete_name: "Ángel Rodrigo Romero Villamayor" })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
  });

  it("should not to be able to create a player without complete_name", async () => {
    const response = await request(app)
      .post("/players")
      .send({ nickname: "Romero" })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
  });

  it("should not to be able to a player twice", async () => {
    await request(app)
      .post("/players")
      .send({
        nickname: "Romero",
        complete_name: "Ángel Rodrigo Romero Villamayor",
      })
      .set({ Authorization: `Bearer ${jwtToken}` });

    const response = await request(app)
      .post("/players")
      .send({
        nickname: "Romero",
        complete_name: "Ángel Rodrigo Romero Villamayor",
      })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Este jogador já está cadastrado");
  });

  it("should not to be able to create a player without a token", async () => {
    const response = await request(app).post("/players").send({
      nickname: "Romero",
      complete_name: "Ángel Rodrigo Romero Villamayor",
    });

    expect(response.status).toBe(401);
  });

  it("should be able to create a player", async () => {
    const response = await request(app)
      .post("/players")
      .send({
        nickname: "Romero",
        complete_name: "Ángel Rodrigo Romero Villamayor",
      })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("nickname");
    expect(response.body).toHaveProperty("complete_name");
  });
});
