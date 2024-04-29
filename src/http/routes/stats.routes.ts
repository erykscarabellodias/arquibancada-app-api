import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import numberOfMatches from "../../modules/stats/useCases/numberOfMatches";

const statsRoutes = Router();

statsRoutes.get(
  "/number-of-matches",
  jwtToken,
  numberOfMatches.handle.bind(numberOfMatches)
);

export { statsRoutes };
