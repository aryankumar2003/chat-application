import express from "express";
import { allChat, sendChat } from "../controller/chat";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Route to fetch all chats for a given chatId
router.get("/:chatId", protect, allChat);

// Route to send a message in a chat
router.post("/", protect, sendChat);

export default router;
