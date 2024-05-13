import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import createPlayer from "../../modules/players/useCases/createPlayer";
import findPlayer from "../../modules/players/useCases/findPlayer";

const playersRoutes = Router();

playersRoutes.get("/", jwtToken, findPlayer.handle.bind(findPlayer));
playersRoutes.post("/", jwtToken, createPlayer.handle.bind(createPlayer));

export default playersRoutes;
