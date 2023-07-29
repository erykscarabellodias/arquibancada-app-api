import { app } from "../../../../../src/app";
import request from "supertest";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../shared/dropDatabase";

let connection: DataSource;

beforeAll(async () => {
  connection = await prepareDatabase();
});

afterAll(async () => {
  await dropDatabase(connection);
});

describe("create user integration test suit", () => {
  it("should be able to create an user", async () => {
    const response = await request(app).post("/auth/create-account").send({
      name: "Eryk",
      email: "erykscarabello97@gmail.com",
      password: "Erk2k13111@",
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create an user without body request", async () => {
    const response = await request(app).post("/auth/create-account").send();

    expect(response.status).toBe(400);
  });
});
