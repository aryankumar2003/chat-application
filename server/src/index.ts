import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from './routes/auth.router';
import connectDB from './config/database';
import { initSockerServer } from './controller/message';
import chatRoutes from './routes/Chat.router';
import conversationRoutes from './routes/Conversation.router';




const app: Application = express();
const server = http.createServer(app);


app.use(cors({
    origin: "http://localhost:5175",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

connectDB();
app.use("/api/auth", router);
app.use("/api/chat", chatRoutes);
app.use("/api/conversations", conversationRoutes);




const io: Server = new Server(server, {
    cors: {
        origin: "http://localhost:5175",
        methods: ["GET", "POST"],
        credentials: true
    }
});

initSockerServer(io);

const port: number = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
