import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import createStadium from "../../modules/stadiums/useCases/createStadium";
import findStadium from "../../modules/stadiums/useCases/findStadium";

const stadiumRoutes = Router();

stadiumRoutes.post("/", jwtToken, createStadium.handle.bind(createStadium));
stadiumRoutes.get("/", jwtToken, findStadium.handle.bind(findStadium));

export default stadiumRoutes;
