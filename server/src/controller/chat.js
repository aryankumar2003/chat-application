"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChat = exports.allChat = void 0;
const chatModel_1 = __importDefault(require("../models/chatModel"));
const asyncHandler_1 = require("../utils/asyncHandler");
exports.allChat = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params; // Extract chatId safely
    if (!chatId) {
        return res.status(400).json({ message: "Chat ID is required" });
    }
    try {
        const chat = yield chatModel_1.default.find({ chat: chatId })
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(chat);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.sendChat = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
    }
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed");
        return res.sendStatus(400);
    }
    const newChat = {
        sender: req.user._id,
        content,
        chat: chatId,
    };
    try {
        let chat = yield chatModel_1.default.create(newChat);
        chat = yield chat.populate("sender", "name pic");
        chat = yield chat.populate("chat");
        chat = yield chat.populate("chat.users", "name pic");
        yield chatModel_1.default.findByIdAndUpdate(chatId, { lastMessage: chat });
        res.json(chat);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
