import { Router } from "express";
import { authenticationRouter } from "./authentication.routes";
import { userRouter } from "./user.routes";
import { teamRoutes } from "./teams.routes";

const routes = Router();

routes.use("/auth", authenticationRouter);
routes.use("/teams", teamRoutes);
routes.use("/users", userRouter);

export { routes };
