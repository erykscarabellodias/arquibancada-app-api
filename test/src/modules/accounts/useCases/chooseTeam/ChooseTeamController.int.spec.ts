import { app } from "../../../../../../src/app";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import createDefaultUserAndGenerateJwtToken from "../../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import createTeams from "../../../../../shared/teams/createTeams";
import { Team } from "../../../../../../src/modules/teams/entities/Team";
import request from "supertest";

describe("choose team controller integration tests suit", () => {
  let connection: DataSource;
  let corinthians: Team;
  let jwtToken: string;

  beforeEach(async () => {
    connection = await prepareDatabase();
    const createdUser = await createDefaultUserAndGenerateJwtToken();
    jwtToken = createdUser.jwtToken as string;
    const teamsCreated = await createTeams();
    corinthians = teamsCreated[0];
  });

  afterEach(async () => {
    await dropDatabase(connection);
  });

  it("should be able to choose a team", async () => {
    const response = await request(app)
      .post("/users/choose-team")
      .send({ teamId: corinthians.id })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(200);
  });

  it("should be able to choose a team twice", async () => {
    await request(app)
      .post("/users/choose-team")
      .send({ teamId: corinthians.id })
      .set({ Authorization: `Bearer ${jwtToken}` });

    const response = await request(app)
      .post("/users/choose-team")
      .send({ teamId: corinthians.id })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Este usuário já torce para um time");
  });

  it("should not to be able to choose a inexistent team", async () => {
    const response = await request(app)
      .post("/users/choose-team")
      .send({ teamId: "63fa6d69-ed93-40b3-9226-fe35eff18239" })
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Este time não existe");
  });

  it("should not to be able to create a team without a token", async () => {
    const response = await request(app)
      .post("/users/choose-team")
      .send({ teamId: corinthians.id });

    expect(response.status).toBe(401);
  });
});
