import express from "express";
import { getUserPanelDetails } from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/panel-details", verifyToken, getUserPanelDetails);

export default router;