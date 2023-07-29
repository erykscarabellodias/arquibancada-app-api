import { appDataSource } from "../../src/config/database/typeorm/data-source";

const prepareDatabase = async () => {
  const connection = await appDataSource.initialize();
  await connection.runMigrations();

  return connection;
};

export { prepareDatabase };
