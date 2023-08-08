import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../../shared/errors/AuthenticationError";
import { JwtTokenService } from "../../shared/security/jwtToken/JwtTokenService";

const jwtToken = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;

  if (!token) {
    throw new AuthenticationError("Token não enviado");
  }

  const [prefix, tokenJwt] = token.split(" ");

  if (!prefix || prefix !== "Bearer" || !tokenJwt) {
    throw new AuthenticationError("Token malformatado");
  }

  const jwtTokenService = new JwtTokenService();
  jwtTokenService.validate(tokenJwt);

  next();
};

export default jwtToken;
