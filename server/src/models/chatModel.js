"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatModel = new mongoose_1.default.Schema({
    sender: { type: mongoose_1.default.Schema.ObjectId },
    chat: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Conversation" },
    time: { type: Date },
    isreaded: { type: Boolean },
    content: { type: String }
});
const Chat = mongoose_1.default.model("chat", chatModel);
exports.default = Chat;
