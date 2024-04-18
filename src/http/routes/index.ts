import { Router } from "express";
import { authenticationRouter } from "./authentication.routes";
import { userRouter } from "./user.routes";
import { teamRoutes } from "./teams.routes";
import stadiumRoutes from "./stadiums.routes";
import tournamentsRoutes from "./tournaments.routes";
import playersRoutes from "./players.routes";
import matchesRoutes from "./match.routes";

const routes = Router();

routes.use("/auth", authenticationRouter);
routes.use("/teams", teamRoutes);
routes.use("/users", userRouter);
routes.use("/stadiums", stadiumRoutes);
routes.use("/tournaments", tournamentsRoutes);
routes.use("/players", playersRoutes);
routes.use("/matches", matchesRoutes);

export { routes };
