"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_1 = require("../controller/conversation");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Route to access or create a one-to-one chat
router.post("/", authMiddleware_1.protect, conversation_1.accessConversation);
// Route to fetch all conversations for a user
router.get("/", authMiddleware_1.protect, conversation_1.fetchConversation);
exports.default = router;
