import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import createTournament from "../../../test/src/modules/tournament/useCases/createTournament";
import listTournaments from "../../modules/tournament/useCases/listTournaments";

const tournamentsRoutes = Router();

tournamentsRoutes.post(
  "/",
  jwtToken,
  createTournament.handle.bind(createTournament)
);

tournamentsRoutes.get(
  "/",
  jwtToken,
  listTournaments.handle.bind(listTournaments)
);

export default tournamentsRoutes;
