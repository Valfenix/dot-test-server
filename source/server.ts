import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Logger from "./utils/winston_config";
import config from "./config/config";
import routes from "./routes/index.routes";
import { SERVER } from "./utils/constants";
import dbConnection from "./utils/dbConnection";

const router = express();
const logger = new Logger("server", SERVER);

const httpServer = http.createServer(router);
const io: any = new Server(httpServer);

// Configure Sockets for Realtime data
io.on("connection", (socket: any) => {
  console.log(`Client connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected ${socket.id}`);
  });
});

router.use(cors());

export { io };

import logging from "./config/logging";

/** Mongoose Database Connection */
dbConnection.connection();

/** Log every requests */
router.use((req: Request, res: Response, next: NextFunction) => {
  /** Log the req */
  logger.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );
  logging.info(
    SERVER,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logger.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
    logging.info(
      SERVER,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/**
 *  View engine setup
 */

router.set("views", path.join(__dirname, "views"));
router.set("view engine", "pug");

/** Parse the body of the request */
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(__dirname));

/** Rules of our API */
router.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

router.use("/api", routes);

/** Error handling */
router.use((_req: Request, res: Response, _next: NextFunction) => {
  const error = new Error("The route you are trying to access was not found");

  res.status(404).json({
    success: false,
    code: 404,
    message: error.message,
  });
});

/** Create the server */
httpServer.listen(process.env.PORT, () => {
  logger.info(
    `Server is running on ${config.server.hostname}:${process.env.PORT}`
  );
});
