import { Router } from "express";
import createUser from "../../modules/accounts/useCases/createUser";
import authController from "../../modules/accounts/useCases/auth";

const authenticationRouter = Router();

authenticationRouter.post(
  "/create-account",
  createUser.handle.bind(createUser)
);

authenticationRouter.post("/login", authController.handle.bind(authController));

export { authenticationRouter };
