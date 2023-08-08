import { Router } from "express";
import createTeam from "../../modules/teams/useCases/createTeam";
import jwtToken from "../middlewares/jwtToken";

const teamRoutes = Router();

teamRoutes.post("/", jwtToken, createTeam.handle.bind(createTeam));

export { teamRoutes };
