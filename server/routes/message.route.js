import express from "express";
import { getUserPanelDetails, uploadDocument, getAllMessages } from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/panel-details", verifyToken, getUserPanelDetails);
router.post("/upload-document", upload.single('file'), verifyToken, uploadDocument);
router.get("/get-all-messages", verifyToken, getAllMessages);

export default router;