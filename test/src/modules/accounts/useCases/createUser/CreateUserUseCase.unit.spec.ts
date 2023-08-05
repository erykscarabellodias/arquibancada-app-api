import { IUserRepository } from "../../../../../../src/modules/accounts/repositories/IUserRepository";
import { UserRepository } from "../../../../../../src/modules/accounts/repositories/implementations/typeorm/UserRepository";
import { CreateUserUseCase } from "../../../../../../src/modules/accounts/useCases/createUser/CreateUserUseCase";
import { CreateUserDto } from "../../../../../../src/modules/accounts/useCases/createUser/dto/CreateUserDto";
import { CreateUserError } from "../../../../../../src/modules/accounts/useCases/createUser/errors/CreateUserError";
import ClassValidatorValidationError from "../../../../../../src/shared/errors/classValidator/ClassValidatorValidationError";
import { PasswordService } from "../../../../../../src/shared/security/password/PasswordService";
import {
  inexistentUser,
  returnUserMock,
} from "../../../../../mocks/user/userMocks";

let userRepository: IUserRepository;
let passwordService: PasswordService;
let useCase: CreateUserUseCase;

beforeEach(() => {
  userRepository = new UserRepository();
  passwordService = new PasswordService();
  useCase = new CreateUserUseCase(userRepository, passwordService);
});

describe("create user test suit", () => {
  it("should be able to create a new user", async () => {
    userRepository.createUser = returnUserMock;
    userRepository.findByEmail = inexistentUser;

    const userDto: CreateUserDto = {
      name: "New User",
      email: "newuser@gmail.com",
      password: "NewUserTest@123",
    };

    const createdUser = await useCase.execute(userDto);

    expect(createdUser).toHaveProperty("id");
    expect(createdUser).toHaveProperty("name");
    expect(createdUser).toHaveProperty("email");
  });

  it("should not be able to create a new user with an existent email", async () => {
    userRepository.createUser = returnUserMock;
    userRepository.findByEmail = returnUserMock;

    const userDto: CreateUserDto = {
      name: "New User",
      email: "newuser@gmail.com",
      password: "NewUserTest@123",
    };

    expect(async () => {
      await useCase.execute(userDto);
    }).rejects.toThrow(
      new CreateUserError("Já existe um usuário cadastrado com este email")
    );
  });

  it("should not be able to create an user with an weak password", async () => {
    userRepository.createUser = returnUserMock;

    const userDto: CreateUserDto = {
      name: "New User",
      email: "newuser@gmail.com",
      password: "weakpassword",
    };

    expect(async () => {
      await useCase.execute(userDto);
    }).rejects.toThrow(ClassValidatorValidationError);
  });

  test.each([
    [
      {
        name: "",
        password: "NewUserTest@123",
        email: "newuser@gmail.com",
      },
    ],
    [{ name: "New User", password: "", email: "newuser@gmail.com" }],
    [{ name: "New User", password: "NewUserTest@123", email: "" }],
  ])(
    "should not be able to create a new user with empty field",
    async (params) => {
      const createUserDto: CreateUserDto = {
        name: params.name,
        password: params.password,
        email: params.email,
      };

      expect(async () => {
        await useCase.execute(createUserDto);
      }).rejects.toThrow(ClassValidatorValidationError);
    }
  );
});
