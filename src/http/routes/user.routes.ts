import { Router } from "express";
import jwtToken from "../middlewares/jwtToken";
import chooseTeam from "../../modules/accounts/useCases/chooseTeam";

const userRouter = Router();

userRouter.post("/choose-team", jwtToken, chooseTeam.handle.bind(chooseTeam));

export { userRouter };
