import request from "supertest";
import { app } from "../../../../../../src/app";
import { DataSource } from "typeorm";
import { prepareDatabase } from "../../../../../shared/prepareDatabase";
import { dropDatabase } from "../../../../../shared/dropDatabase";
import { PasswordService } from "../../../../../../src/shared/security/password/PasswordService";
import { UserRepository } from "../../../../../../src/modules/accounts/repositories/implementations/typeorm/UserRepository";
import { IUserRepository } from "../../../../../../src/modules/accounts/repositories/IUserRepository";
import { CreateUserUseCase } from "../../../../../../src/modules/accounts/useCases/createUser/CreateUserUseCase";

describe("auth controller integration tests suit", () => {
  let connection: DataSource;
  let userRepository: IUserRepository;
  let passwordService: PasswordService;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(async () => {
    connection = await prepareDatabase();

    userRepository = new UserRepository();
    passwordService = new PasswordService();
    createUserUseCase = new CreateUserUseCase(userRepository, passwordService);

    await createUserUseCase.execute({
      name: "user test",
      email: "usertest@gmail.com",
      password: "VeryStr0ngP@assword!",
    });
  });

  afterAll(async () => {
    await dropDatabase(connection);
  });

  it("should to be able to login and generate a token", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "usertest@gmail.com",
      password: "VeryStr0ngP@assword!",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });

  it("should not be able to login with a inexistent user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "inexistentusertest@gmail.com",
      password: "VeryStr0ngP@assword!",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Este usuário não existe");
  });

  it("should not be able to login with a wrong password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "usertest@gmail.com",
      password: "VeryStr0ngP@assword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Senha incorreta");
  });

  test.each([
    [
      {
        email: "usertest@gmail.com",
      },
      {
        password: "VeryStr0ngP@assword!",
      },
    ],
  ])(
    "should receive a bad request response if any fields are empty",
    async (param) => {
      const response = await request(app).post("/auth/login").send({
        param,
      });

      expect(response.status).toBe(400);
    }
  );
});
