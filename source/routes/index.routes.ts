import express from "express";
import post from "./post.routes";

const router = express.Router();

/** Routes go here */

router.use("/post", post);

export = router;
