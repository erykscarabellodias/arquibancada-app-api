import { app } from "../../../../../../src/app";
import request from "supertest";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import createDefaultUserAndGenerateJwtToken from "../../../../../shared/authentication/createDefaultUserAndGenerateJwtToken";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import CreateStadiumInputDto from "../../../../../../src/modules/stadiums/useCases/createStadium/dto/CreateStadiumInput.dto";

describe("create stadium controller integration tests suit", () => {
  let connection: DataSource;
  let jwtToken: string;

  beforeEach(async () => {
    connection = await prepareDatabase();
    const createdUser = await createDefaultUserAndGenerateJwtToken();
    jwtToken = createdUser.jwtToken;
  });

  afterEach(async () => {
    await dropDatabase(connection);
  });

  it("should be able to create a new stadium", async () => {
    const newStadium: CreateStadiumInputDto = {
      name: "Neo Química Arena",
      public_capacity: 47000,
    };

    const response = await request(app)
      .post("/stadiums")
      .send(newStadium)
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("public_capacity");
  });

  it("should not be able to create a same stadium twice", async () => {
    const newStadium: CreateStadiumInputDto = {
      name: "Neo Química Arena",
      public_capacity: 47000,
    };

    await request(app)
      .post("/stadiums")
      .send(newStadium)
      .set({ Authorization: `Bearer ${jwtToken}` });

    const responseSecondTeam = await request(app)
      .post("/stadiums")
      .send(newStadium)
      .set({ Authorization: `Bearer ${jwtToken}` });

    expect(responseSecondTeam.status).toBe(400);
    expect(responseSecondTeam.body).toHaveProperty("message");
    expect(responseSecondTeam.body.message).toBe(
      "Este estádio já está cadastrado"
    );
  });

  it("should not to be able to create a new stadium without a token", async () => {
    const newStadium: CreateStadiumInputDto = {
      name: "Neo Química Arena",
      public_capacity: 47000,
    };

    const response = await request(app).post("/stadiums").send(newStadium);

    expect(response.status).toBe(401);
  });

  test.each([
    [
      { name: "Neo Química Arena", public_capacity: "" },
      { name: "", public_capacity: 47000 },
      { name: "Neo Química Arena", public_capacity: -47000 },
    ],
  ])(
    "should not to be able to create a new stadium with invalid or empty fields",
    async (param) => {
      const response = await request(app)
        .post("/stadiums")
        .send(param)
        .set({ Authorization: `Bearer ${jwtToken}` });

      expect(response.status).toBe(400);
    }
  );
});
