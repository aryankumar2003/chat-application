import { Request, Response } from "express";
import Chat from "../models/chatModel";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

export const allChat = asyncHandler(
  async (req: Request, res: Response) => {
    const { chatId } = req.params; // Extract chatId safely

    if (!chatId) {
      return res.status(400).json({ message: "Chat ID is required" });
    }

    try {
      const chat = await Chat.find({ chat: chatId })
        .populate("sender", "name pic email")
        .populate("chat");
      res.json(chat);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

export const sendChat = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, user not found" });
  }

  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed");
    return res.sendStatus(400);
  }

  const newChat = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let chat = await Chat.create(newChat);

    chat = await chat.populate("sender", "name pic");
    chat = await chat.populate("chat");
    chat = await chat.populate("chat.users", "name pic");

    await Chat.findByIdAndUpdate(chatId, { lastMessage: chat });

    res.json(chat);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
