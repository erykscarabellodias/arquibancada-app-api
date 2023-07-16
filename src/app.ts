import "express-async-errors";
import express from "express";
import { routes } from "./http/routes";
import { errorHandling } from "./http/middlewares/errorHandling";
import { appDataSource } from "./config/database/typeorm/data-source";

const app = express();

appDataSource.initialize();

app.use(express.json());

app.use(routes);

app.use(errorHandling);

export { app };
