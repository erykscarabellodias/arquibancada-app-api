import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import createStadium from "../../modules/stadiums/useCases/createStadium";

const stadiumRoutes = Router();

stadiumRoutes.post("/", jwtToken, createStadium.handle.bind(createStadium));

export default stadiumRoutes;
