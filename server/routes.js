import express from "express";
import { loginUser, registerUser, verifyUser } from "./controllers/user.controller.js";
import { upload } from "./middlewares/multer.middleware.js"
const router = express.Router();

// Login & Register
router.post("/auth/login", loginUser);
router.post('/auth/register', upload.single('avatarImage'), registerUser);
router.post('/auth/verifyUser', verifyUser)

export default router;