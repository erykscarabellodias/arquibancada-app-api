import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import createTeam from "../../modules/teams/useCases/createTeam";
import findTeam from "../../modules/teams/useCases/findTeam";
import chooseStadium from "../../modules/teams/useCases/chooseStadium";

const teamRoutes = Router();

teamRoutes.post("/", jwtToken, createTeam.handle.bind(createTeam));
teamRoutes.get("/", jwtToken, findTeam.handle.bind(findTeam));
teamRoutes.post(
  "/choose-stadium",
  jwtToken,
  chooseStadium.handle.bind(chooseStadium)
);

export { teamRoutes };
