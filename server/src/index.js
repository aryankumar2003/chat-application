"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_router_1 = __importDefault(require("./routes/auth.router")); // Import the router
const database_1 = __importDefault(require("./config/database"));
const message_1 = require("./controller/message");
const Chat_router_1 = __importDefault(require("./routes/Chat.router"));
const Conversation_router_1 = __importDefault(require("./routes/Conversation.router"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/api/auth", auth_router_1.default);
app.use("/api/chat", Chat_router_1.default);
app.use("/api/conversations", Conversation_router_1.default); // Use the router correctly
(0, database_1.default)();
const port = 3000;
(0, message_1.initSockerServer)(io);
// Handle the socket
app.listen(port, () => {
    console.log("Connected to the server");
});
