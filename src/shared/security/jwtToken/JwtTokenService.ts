import "../../infra/configureEnvironment";
import { TokenExpiredError, sign, verify } from "jsonwebtoken";
import { User } from "../../../modules/accounts/entities/User";
import { AuthenticationError } from "../../errors/AuthenticationError";
export class JwtTokenService {
  public generate(user: User): string {
    const token = sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_TOKEN_SECRET!,
      {
        expiresIn: `${process.env.JWT_TOKEN_EXPIRATION_IN_MINUTES} minutes`,
      }
    );

    return token;
  }

  public validate(token: string): TokenPropertiesInterface {
    try {
      const authenticaredUser = verify(
        token,
        process.env.JWT_TOKEN_SECRET!
      ) as TokenPropertiesInterface;

      const user: TokenPropertiesInterface = {
        sub: authenticaredUser.sub,
        name: authenticaredUser.name,
        email: authenticaredUser.email,
      };

      return user;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AuthenticationError("Token expirado");
      }

      throw new AuthenticationError("Token inválido");
    }
  }
}

interface TokenPropertiesInterface {
  sub: string;
  name: string;
  email: string;
}
