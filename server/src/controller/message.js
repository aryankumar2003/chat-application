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
exports.initSockerServer = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const chatModel_1 = __importDefault(require("../models/chatModel"));
const app = (0, express_1.default)();
const SECRET_KEY = process.env.JWT || "jwt-key";
const server = http_1.default.createServer(app);
const initSockerServer = (server) => __awaiter(void 0, void 0, void 0, function* () {
    const io = new socket_io_1.Server(server);
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error("Token not found"));
            }
            const user = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            socket.user = user;
            next();
        }
        catch (error) {
            next(new Error("Invalid token"));
        }
    });
    io.on("Connection", (socket) => {
        socket.join(socket.user.id);
        socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const message = new chatModel_1.default({
                    sender: socket.user.id,
                    receiver: data.receiver,
                    content: data.content
                });
                yield message.save();
                socket.to(data.receiver).emit("message", message);
            }
            catch (error) {
                console.error("Error saving message:", error);
            }
        }));
        socket.on("disconnected", () => {
            console.log("disconnected");
        });
    });
    return io;
});
exports.initSockerServer = initSockerServer;
