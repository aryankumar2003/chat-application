import express, { Application} from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import router from './routes/auth.router';  // Import the router
import connectDB from './config/database';
import { initSockerServer } from './controller/message';
import chatRoutes from "./routes/Chat.router";
import conversationRoutes from "./routes/Conversation.router";
const app: Application = express();

const server = http.createServer(app);
const io: Server = new Server(server);


dotenv.config();

app.use(express.json());
app.use("/api/auth", router); 
app.use("/api/chat", chatRoutes);
app.use("/api/conversations", conversationRoutes); // Use the router correctly
connectDB();

const port: number = 3000;

initSockerServer(io);
// Handle the socket


app.listen(port, () => {
    console.log("Connected to the server");
});
