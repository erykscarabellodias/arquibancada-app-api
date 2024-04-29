import { app } from "../../../../../../src/app";
import CreateTeamInputDto from "../../../../../../src/modules/teams/useCases/createTeam/dto/CreateTeamInputDto";
import request from "supertest";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import { DataSource } from "typeorm";
import createDefaultUserAndGenerateJwtToken from "../../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";

let connection: DataSource;
let tokenJwt: string;

beforeAll(async () => {
  connection = await prepareDatabase();
  const createdUser = await createDefaultUserAndGenerateJwtToken();
  tokenJwt = createdUser.jwtToken;
});

afterAll(async () => {
  await dropDatabase(connection);
});

describe("create team controller integration tests suit", () => {
  it("should be able to create a new team", async () => {
    const newUser: CreateTeamInputDto = {
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      city: "São Paulo",
      state: "São Paulo",
    };

    const response = await request(app)
      .post("/teams")
      .send(newUser)
      .set({ Authorization: `Bearer ${tokenJwt}` });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("complete_name");
    expect(response.body).toHaveProperty("nickname");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("state");
  });

  it("should not be able to create a team already exists", async () => {
    const userAlreadyExists: CreateTeamInputDto = {
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      city: "São Paulo",
      state: "São Paulo",
    };

    const response = await request(app)
      .post("/teams")
      .send(userAlreadyExists)
      .set({ Authorization: `Bearer ${tokenJwt}` });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Este time já está cadastrado");
  });

  it("should not be able to create a team without authorization", async () => {
    const userAlreadyExists: CreateTeamInputDto = {
      complete_name: "Sport Club Corinthians Paulista",
      nickname: "Corinthians",
      city: "São Paulo",
      state: "São Paulo",
    };

    const response = await request(app).post("/teams").send(userAlreadyExists);

    expect(response.status).toBe(401);
  });

  test.each([
    [
      {
        nickname: "Corinthians",
        city: "São Paulo",
        state: "São Paulo",
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        city: "São Paulo",
        state: "São Paulo",
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        state: "São Paulo",
      },
      {
        complete_name: "Sport Club Corinthians Paulista",
        nickname: "Corinthians",
        city: "São Paulo",
      },
    ],
  ])(
    "should not be able to create a new team with request missing fields",
    async (params) => {
      const response = await request(app)
        .post("/teams")
        .send(params)
        .set({ Authorization: `Bearer ${tokenJwt}` });

      expect(response.status).toBe(400);
    }
  );
});
