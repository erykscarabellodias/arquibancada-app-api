import { Router } from "express";
import createUser from "../../modules/accounts/useCases/createUser";

const authenticationRouter = Router();

authenticationRouter.post(
  "/create-account",
  createUser.handle.bind(createUser)
);

export { authenticationRouter };
