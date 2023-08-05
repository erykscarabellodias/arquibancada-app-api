import { User } from "../../../../../src/modules/accounts/entities/User";
import { JwtTokenService } from "../../../../../src/shared/security/jwtToken/JwtTokenService";

describe("json web token service test suit", () => {
  const jwtService = new JwtTokenService();
  const user = new User();
  user.id = "96f35936-afd5-4d94-8a47-dfa3ac50d46b";
  user.name = "Test user";
  user.email = "test@mail.com";

  it("a generated token must have three parts", () => {
    const token = jwtService.generate(user);
    const parts = token.split(".");

    expect(parts).toHaveLength(3);
  });
});
