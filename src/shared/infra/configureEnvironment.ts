import { configDotenv } from "dotenv";

(function configureEnvironment() {
  configDotenv({
    path: process.env.ENV == "test" ? ".env.test" : ".env",
  });
})();
