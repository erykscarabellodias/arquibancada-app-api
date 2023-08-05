import "../../infra/configureEnvironment";
import { sign } from "jsonwebtoken";
import { User } from "../../../modules/accounts/entities/User";
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
}
