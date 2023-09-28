import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import createTournament from "../../../test/src/modules/tournament/useCases/createTournament";

const tournamentsRoutes = Router();

tournamentsRoutes.post(
  "/",
  jwtToken,
  createTournament.handle.bind(createTournament)
);

export default tournamentsRoutes;
