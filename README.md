# Real-time Chat Application

A modern real-time chat application built with React, Node.js, Express, and Socket.IO. This application allows users to register, login, and communicate in real-time with other users.

## Features

- 🔐 Secure authentication using JWT
- 👥 User registration and login
- 💬 Real-time messaging using Socket.IO
- 🛡️ Protected routes for authenticated users
- 📱 Responsive design
- 🔄 Real-time message updates

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Socket.IO Client for real-time communication
- Axios for HTTP requests

### Backend
- Node.js
- Express.js
- Socket.IO for real-time communication
- MongoDB for database
- JWT for authentication
- TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
```bash
git clone <your-repository-url>
cd chat_app
```

2. Install dependencies for both client and server

For the client:
```bash
cd client
npm install
```

For the server:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the development servers

For the client (in the client directory):
```bash
npm run dev
```

For the server (in the server directory):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5175
- Backend: http://localhost:3000

## Project Structure

```
chat_app/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.ts
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Chat
- Socket.IO events for real-time messaging

## Security Features

- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- Secure token storage in localStorage
- CORS configuration for secure cross-origin requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
