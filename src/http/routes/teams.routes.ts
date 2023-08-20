import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import createTeam from "../../modules/teams/useCases/createTeam";
import findTeam from "../../modules/teams/useCases/findTeam";

const teamRoutes = Router();

teamRoutes.post("/", jwtToken, createTeam.handle.bind(createTeam));
teamRoutes.get("/", jwtToken, findTeam.handle.bind(findTeam));

export { teamRoutes };
