import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { addFriend, getAllFriends, getAllUsers } from "../controllers/friend.controller.js";

const router = express.Router();

router.post("/add-friend", verifyToken, addFriend);
router.get('/get-all-users', verifyToken, getAllUsers);
router.get('/get-users-friends', verifyToken, getAllFriends);

export default router;