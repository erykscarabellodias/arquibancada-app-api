import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../../../modules/accounts/entities/User";

export const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
});
