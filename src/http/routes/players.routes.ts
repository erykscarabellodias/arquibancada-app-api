import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import createPlayer from "../../modules/players/useCases/createPlayer";

const playersRoutes = Router();

playersRoutes.post("/", jwtToken, createPlayer.handle.bind(createPlayer));

export default playersRoutes;
