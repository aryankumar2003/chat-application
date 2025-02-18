"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_1 = require("../controller/chat");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Route to fetch all chats for a given chatId
router.get("/:chatId", authMiddleware_1.protect, chat_1.allChat);
// Route to send a message in a chat
router.post("/", authMiddleware_1.protect, chat_1.sendChat);
exports.default = router;
