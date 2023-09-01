import { Router } from "express";
import { authenticationRouter } from "./authentication.routes";
import { userRouter } from "./user.routes";
import { teamRoutes } from "./teams.routes";
import stadiumRoutes from "./stadiums.routes";

const routes = Router();

routes.use("/auth", authenticationRouter);
routes.use("/teams", teamRoutes);
routes.use("/users", userRouter);
routes.use("/stadiums", stadiumRoutes);

export { routes };
