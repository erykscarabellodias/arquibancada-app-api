import { app } from "../../../../../src/app";
import request from "supertest";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../shared/prepareDatabase";
import Stadium from "../../../../../src/modules/stadiums/entites/Stadium";
import createStadiums from "../../../../shared/stadiums/createStadiums";
import createDefaultUserWithTeamAndGenerateJwtToken from "../../../../shared/authentication/createDefaultUserWithTeamAndGenerateJwtToken";
import createDefaultUserAndGenerateJwtToken from "../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import { dropDatabase } from "../../../../shared/dropDatabase";

describe("choose stadium controller integration tests suit", () => {
  let connection: DataSource;
  let stadium: Stadium;
  let jwtToken: string;

  beforeEach(async () => {
    connection = await prepareDatabase();
    stadium = await createStadiums();
  });

  afterEach(async () => {
    await dropDatabase(connection);
  });

  it("should be able to choose a team stadium", async () => {
    jwtToken = await createDefaultUserWithTeamAndGenerateJwtToken();

    const response = await request(app)
      .post("/teams/choose-stadium")
      .send({ stadiumId: stadium.id })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
  });

  it("should not to be able to choose a team without before choose a team", async () => {
    jwtToken = await createDefaultUserAndGenerateJwtToken();

    const response = await request(app)
      .post("/teams/choose-stadium")
      .send({ stadiumId: stadium.id })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Escolha um time antes de escolher um estádio"
    );
  });

  it("should not to be able to choose a stadium for a team already have a stadium", async () => {
    jwtToken = await createDefaultUserWithTeamAndGenerateJwtToken();

    await request(app)
      .post("/teams/choose-stadium")
      .send({ stadiumId: stadium.id })
      .set({ Authorization: `Bearer ${jwtToken}` });

    const response = await request(app)
      .post("/teams/choose-stadium")
      .send({ stadiumId: stadium.id })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Seu time já tem um estádio cadastrado");
  });

  it("should not to be able to choose an inexistent stadium", async () => {
    jwtToken = await createDefaultUserWithTeamAndGenerateJwtToken();

    const response = await request(app)
      .post("/teams/choose-stadium")
      .send({ stadiumId: "5da08a24-5815-11ee-8c99-0242ac120002" })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Este estádio não existe");
  });

  it("should not to be able to choose a team stadium without a token", async () => {
    jwtToken = await createDefaultUserWithTeamAndGenerateJwtToken();

    const response = await request(app)
      .post("/teams/choose-stadium")
      .send({ stadiumId: stadium.id });

    expect(response.status).toBe(401);
  });
});
