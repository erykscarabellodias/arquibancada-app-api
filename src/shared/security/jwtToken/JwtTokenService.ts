import "../../infra/configureEnvironment";
import {
  JsonWebTokenError,
  TokenExpiredError,
  sign,
  verify,
} from "jsonwebtoken";
import { User } from "../../../modules/accounts/entities/User";
import { AuthenticationError } from "../../errors/AuthenticationError";
export class JwtTokenService {
  public generate(user: User): string {
    const token = sign(
      {
        sub: user.id,
        name: user.name,
      },
      process.env.JWT_TOKEN_SECRET!,
      {
        expiresIn: `${process.env.JWT_TOKEN_EXPIRATION_IN_MINUTES} minutes`,
      }
    );

    return token;
  }

  public validate(token: string): void {
    try {
      verify(token, process.env.JWT_TOKEN_SECRET!);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AuthenticationError("Token expirado");
      }

      throw new AuthenticationError("Token inválido");
    }
  }
}
