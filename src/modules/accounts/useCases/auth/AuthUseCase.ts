import { plainToClass } from "class-transformer";
import { JwtTokenService } from "../../../../shared/security/jwtToken/JwtTokenService";
import { PasswordService } from "../../../../shared/security/password/PasswordService";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AuthInputDto } from "./dto/AuthInputDto";
import { AuthOutputDto } from "./dto/AuthOutputDto";
import { AuthError } from "./errors/AuthError";
import ClassValidatorValidationError from "../../../../shared/errors/classValidator/ClassValidatorValidationError";
import { validate } from "class-validator";

export default class AuthUseCase {
  private repository: IUserRepository;
  private passwordService: PasswordService;
  private jwtTokenService: JwtTokenService;

  constructor(
    userRepository: IUserRepository,
    passworService: PasswordService,
    jwtTokenService: JwtTokenService
  ) {
    this.repository = userRepository;
    this.passwordService = passworService;
    this.jwtTokenService = jwtTokenService;
  }

  public async execute(authDto: AuthInputDto): Promise<AuthOutputDto> {
    const { email, password } = authDto;

    const requestDataErrors = await validate(
      plainToClass(AuthInputDto, authDto)
    );

    if (requestDataErrors.length > 0) {
      throw new ClassValidatorValidationError(requestDataErrors);
    }

    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AuthError("Este usuário não existe");
    }

    const passwordIsValid = this.passwordService.checkPassword(
      password,
      user.password
    );

    if (!passwordIsValid) {
      throw new AuthError("Senha incorreta");
    }

    const token = this.jwtTokenService.generate(user);

    return new AuthOutputDto(user.name, user.email, token);
  }
}
