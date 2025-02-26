
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import chat from '../models/chatModel'



const SECRET_KEY = process.env.JWT as string;


export const initSockerServer = async (server: any) => {
    const io: Server = new Server(server);

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error("Token not found"));
            }
            const user = jwt.verify(token, SECRET_KEY);
            (socket as any).user = user;
            next();
        }
        catch (error) {
            next(new Error("Invalid token"));
        }
    });

    io.on("Connection", (socket) => {
        socket.join(socket.user.id);

        socket.on("message", async(data: { receiver: string; content: string }) => {
            try {
                const message = new chat({
                    sender: socket.user!.id,
                    receiver: data.receiver,
                    content: data.content
                });
                await message.save();
                socket.to(data.receiver).emit("message", message);
            }
            catch (error) {
                console.error("Error saving message:", error);
            }
        });
        socket.on("disconnected", () => {
            console.log("disconnected");
        });
    });
    
    return io;
}