import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect(token) {
        this.socket = io('http://localhost:3000', {
            auth: {
                token: token
            }
        });

        this.socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    // Send a message
    sendMessage(receiverId, content) {
        if (this.socket) {
            this.socket.emit('message', {
                receiver: receiverId,
                content: content
            });
        }
    }

    // Listen for incoming messages
    onMessage(callback) {
        if (this.socket) {
            this.socket.on('message', callback);
        }
    }

    // Remove message listener
    offMessage(callback) {
        if (this.socket) {
            this.socket.off('message', callback);
        }
    }
}

export default new SocketService(); 