import { app } from "../../../../../../src/app";
import request from "supertest";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../../shared/dropDatabase";

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
      name: "new user",
      email: "newuser@gmail.com",
      password: "VeryStr0ngP@assword!",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });

  it("should not be possible to create a user with an email already registered", async () => {
    const response = await request(app).post("/auth/create-account").send({
      name: "new user",
      email: "newuser@gmail.com",
      password: "VeryStr0ngP@assword!",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Já existe um usuário cadastrado com este email"
    );
  });

  it("should not be able to create an user without body request", async () => {
    const response = await request(app).post("/auth/create-account").send();

    expect(response.status).toBe(400);
  });

  test.each([
    { name: "new user", email: "newuser@gmail.com" },
    { email: "newuser@gmail.com", password: "VeryStrongP@assword!" },
    { name: "new user", password: "VeryStrongP@assword!" },
  ])("request missing fields should return status code 400", async (params) => {
    const response = await request(app)
      .post("/auth/create-account")
      .send(params);

    expect(response.status).toBe(400);
  });

  it("weak password should return http status code 400", async () => {
    const response = await request(app).post("/auth/create-account").send({
      name: "new user",
      email: "newuser@gmail.com",
      password: "weakpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].error[0]).toBe(
      "A sua senha deve conter ao menos 8 caracteres, letras maiúsculas e minúsculas, um número e um caractere especial (!, #, @, $, %, & ou *)"
    );
  });

  it("invalid email should return http status code 400", async () => {
    const response = await request(app).post("/auth/create-account").send({
      name: "new user",
      email: "newuser",
      password: "VeryStr0ngP@assword!",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].error[0]).toBe("O email não é válido");
  });
});
