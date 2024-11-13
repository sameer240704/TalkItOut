import express from "express";
import { getAllUsers, getCurrentUser, loginUser, logout, registerUser, updateUserBioData } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', upload.single('avatarImage'), registerUser);
router.get('/current-user-info', verifyToken, getCurrentUser);
router.get('/get-all-users', getAllUsers);
router.put('/update-biodata', verifyToken, updateUserBioData);
router.get('/logout', logout);

export default router;