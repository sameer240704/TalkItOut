import express from "express";
import { getCurrentUser, loginUser, registerUser, verifyUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', upload.single('avatarImage'), registerUser);
router.post('/verifyUser', verifyUser);
router.get('/current-user-info', getCurrentUser);

export default router;