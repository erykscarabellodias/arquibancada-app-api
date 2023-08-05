import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CreateUserDto } from "./dto/CreateUserDto";
import { PasswordService } from "../../../../shared/security/password/PasswordService";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";
import { ApplicationError } from "../../../../shared/errors/ApplicationError";
import { UserOutputMapper } from "./dto/UserOutputMapper";
import { UserOutputDto } from "./dto/UserOutputDto";
import { CreateUserError } from "./errors/CreateUserError";

export class CreateUserUseCase {
  private repository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.repository = userRepository;
  }

  async execute(createUserDto: CreateUserDto): Promise<UserOutputDto> {
    const requestDataErrors = await validate(
      plainToClass(CreateUserDto, createUserDto)
    );

    if (requestDataErrors.length > 0) {
      throw new ClassValidatorValidationError(requestDataErrors);
    }

    const { name, email, password } = createUserDto;

    const userAlreadyExists = await this.repository.findByEmail(email);

    if (userAlreadyExists) {
      throw new CreateUserError(
        "Já existe um usuário cadastrado com este email"
      );
    }

    const encryptedPassword = this.passwordService.encryptPassword(password);

    const createdUser = await this.repository.createUser({
      name,
      email,
      password: encryptedPassword,
    });

    return UserOutputMapper.toMap(createdUser);
  }
}
