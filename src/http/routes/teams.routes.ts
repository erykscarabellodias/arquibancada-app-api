import { Router } from "express";
import createTeam from "../../modules/teams/useCases/createTeam";

const teamRoutes = Router();

teamRoutes.post("/", createTeam.handle.bind(createTeam));

export { teamRoutes };
