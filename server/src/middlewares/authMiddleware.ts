import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {asyncHandler} from "../utils/asyncHandler";
import User from "../models/usersModel";

export interface AuthenticatedRequest extends Request {
  user?: any; // You can replace `any` with a proper User type if available
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "secretKey") as JwtPayload;
      console.log("Decoded Token:", decoded);

      const userId = decoded.userId as string;
      if (!userId) {
        throw new Error("Invalid token structure");
      }

      req.user = await User.findById(userId).select("-password");

      if (!req.user) {
        throw new Error("User not found");
      }

      next();
    } catch (error: any) {
      console.error("JWT Error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

export { protect };
