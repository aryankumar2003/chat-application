import express from "express";
import {  accessConversation, fetchConversation } from "../controller/conversation";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Route to access or create a one-to-one chat
router.post("/", protect, accessConversation);

// Route to fetch all conversations for a user
router.get("/", protect, fetchConversation);

export default router;
