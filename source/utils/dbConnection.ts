import mongoose from "mongoose";
import { MONGO_DB_URL, MONGO_OPTIONS } from "../config/config";
import { DATABASE } from "./constants";

// import winston
import Logger from "./winston_config";

const logger = new Logger("db", DATABASE);

const connection = async () => {
  mongoose
    .connect(MONGO_DB_URL, MONGO_OPTIONS)
    .then(async () => {
      logger.info(`Connected to MongoDB...`);
    })
    .catch((error) => {
      console.log(error);
      logger.error(error.message);
      throw new Error(
        "Sorry a fatal error has occurred!, the application could not connect to the provided database."
      );
    });
};

export default { connection };
