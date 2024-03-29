import dotenv from "dotenv";
dotenv.config();

// Environment Middleware
function getEnv(variable: string, optional: boolean = false) {
  if (process.env[variable] === undefined) {
    if (optional) {
      console.warn(
        `[@env]: Environmental variable for ${variable} is not supplied. \n So a default value will be generated for you.`
      );
    } else {
      throw new Error(
        `You must create an environment variable for ${variable}`
      );
    }
  }

  return process.env[variable]?.replace(/\\n/gm, "\n");
}

// environment
export const env = {
  isDev: String(process.env.NODE_ENV).toLowerCase().includes("dev"),
  isTest: String(process.env.NODE_ENV).toLowerCase().includes("test"),
  isProd: String(process.env.NODE_ENV).toLowerCase().includes("prod"),
  isStaging: String(process.env.NODE_ENV).toLowerCase().includes("staging"),
  env: process.env.NODE_ENV,
};

// export const MONGO_DB_URL = getEnv("MONGO_DB_URL")!;

export const MONGO_DB_URL =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/dot";

export const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 90000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false,
};

// SERVER CONFIG
const SERVER_HOSTNAME = env.isProd ? process.env.SERVER_HOSTNAME : "localhost";
const SERVER_PORT = env.isProd ? process.env.PORT : 1337;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  server: SERVER,
};

export default config;
