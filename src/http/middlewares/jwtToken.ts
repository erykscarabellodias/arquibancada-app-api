import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../../shared/errors/AuthenticationError";
import { JwtTokenService } from "../../shared/security/jwtToken/JwtTokenService";
import { UserRepository } from "../../modules/accounts/repositories/implementations/typeorm/UserRepository";
import { UserVisibleAttributesMapper } from "../../modules/accounts/useCases/createUser/dto/UserVisibleAttributesMapper";

const jwtToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    throw new AuthenticationError("Token não enviado");
  }

  const [prefix, tokenJwt] = token.split(" ");

  if (!prefix || prefix !== "Bearer" || !tokenJwt) {
    throw new AuthenticationError("Token malformatado");
  }

  const jwtTokenService = new JwtTokenService();
  const authenticatedUser = jwtTokenService.validate(tokenJwt);

  const userRepository = new UserRepository();
  const user = await userRepository.findById(authenticatedUser.sub);

  if (!user) {
    throw new AuthenticationError("Este usuário não existe");
  }

  request.user = UserVisibleAttributesMapper.toMap(user);

  next();
};

export default jwtToken;
