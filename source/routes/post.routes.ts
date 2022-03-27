import express from "express";
import controller from "../controllers/posts";

const router = express.Router();

router.post("/create", controller.create);
router.get("/get", controller.get);

export = router;
