import { Router } from "express";
import { authenticationRouter } from "./authentication.routes";

const routes = Router();

routes.use("/auth", authenticationRouter);

export { routes };
