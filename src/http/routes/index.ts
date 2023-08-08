import { Router } from "express";
import { authenticationRouter } from "./authentication.routes";
import { teamRoutes } from "./teams.routes";

const routes = Router();

routes.use("/auth", authenticationRouter);
routes.use("/teams", teamRoutes);

export { routes };
