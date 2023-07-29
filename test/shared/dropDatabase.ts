import { DataSource } from "typeorm";

const dropDatabase = async (connection: DataSource) => {
  await connection.dropDatabase();
  await connection.destroy();
};

export { dropDatabase };
