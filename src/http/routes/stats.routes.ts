import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import numberOfMatches from "../../modules/stats/useCases/numberOfMatches";
import winsDrawsAndLossesUseCase from "../../modules/stats/useCases/winsDrawsAndLossesUseCase";
import successRate from "../../modules/stats/useCases/successRate";

const statsRoutes = Router();

statsRoutes.get(
  "/number-of-matches",
  jwtToken,
  numberOfMatches.handle.bind(numberOfMatches)
);

statsRoutes.get(
  "/wins-draws-and-losses",
  jwtToken,
  winsDrawsAndLossesUseCase.handle.bind(winsDrawsAndLossesUseCase)
);

statsRoutes.get(
  "/success-rate",
  jwtToken,
  successRate.handle.bind(successRate)
);

export { statsRoutes };
