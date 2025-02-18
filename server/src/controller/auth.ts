import User from '../models/usersModel';
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//register
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, phone, password, profilephoto } = req.body;

        if (!username) {
            res.status(400).json({ error: "Please Enter Your Name" });
            return;
        }
        if (!phone) {
            res.status(400).json({ error: "Please Enter Your phone Number" });
            return;
        }
        if (!password) {
            res.status(400).json({ error: "Please Enter Your Password" });
            return;
        }
        if (await User.findOne({ phone })) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        // Hash Password Before Saving
  
        const hashedPassword = await bcrypt.hash(password,10);

        // Create New User
        await User.create({ username, phone, password: hashedPassword, profilephoto });

        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//login//login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phone, password } = req.body;

        if (!phone) {
            res.status(400).json({ error: "Please Enter Your phone Number" });
            return;
        }
        if (!password) {
            res.status(400).json({ error: "Please Enter Your Password" });
            return;
        }

        const user = await User.findOne({ phone });

        if (!user || !user.password) {  // 🔹 Ensure password exists
            res.status(400).json({ error: "User Not Found or Invalid Credentials" });
            return;
        }

        // 🔹 Ensure `user.password` is always a string before comparison
        const isMatch = await bcrypt.compare(password, user.password as string);

        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "secretKey",
            { expiresIn: "1h" }
        );

        res.json({ message: "Login Successfully", token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
