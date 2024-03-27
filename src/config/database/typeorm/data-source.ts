import { DataSource } from "typeorm";
import { User } from "../../../modules/accounts/entities/User";
import { Team } from "../../../modules/teams/entities/Team";
import Stadium from "../../../modules/stadiums/entites/Stadium";
import Tournament from "../../../modules/tournament/entities/Tournament";
import Match from "../../../modules/matches/entities/Match";

export const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.ENV == "development" ? true : false,
  entities: [User, Team, Stadium, Tournament, Match],
  subscribers: [],
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
});
