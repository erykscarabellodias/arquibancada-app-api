import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import registerMatch from "../../modules/matches/registerMatch";

const matchesRoutes = Router();

matchesRoutes.post("/", jwtToken, registerMatch.handle.bind(registerMatch));

export default matchesRoutes;
