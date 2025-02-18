import { Request, Response } from "express";

import mongoose from "mongoose";
import Conversation, { IConversation } from "../models/conversationModel";
import User, { IUser } from "../models/usersModel";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
//@description     Create or fetch One-to-One Chat
//@route           POST /api/chat/
//@access          Protected
export const accessConversation =asyncHandler( async (req:AuthenticatedRequest, res:Response) => {
  try {
    const { userId } = req.body; // The user you want to start a chat with
    const loggedInUserId = req.user._id; // The logged-in user

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // ✅ Ensure both userIds are ObjectId
    const participants = [
      new mongoose.Types.ObjectId(userId),
      new mongoose.Types.ObjectId(loggedInUserId),
    ];

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participants: { $all: participants },
    })
      .populate("participants", "-password") // Populate users but exclude passwords
      .populate("lastMessage");

    // If no conversation exists, create one
    if (!conversation) {
      conversation = new Conversation({
        participants,
      });

      await conversation.save();
      conversation = await conversation.populate("participants", "-password");
    }

    res.status(200).json(conversation);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
export const fetchConversation =asyncHandler( async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const conversation = await Conversation.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("participants", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    const populatedChats = await User.populate(conversation, {
      path: "lastMessage.sender",
      select: "name profilephoto email",
    });

    return res.status(200).json(populatedChats);
  } catch (error: any) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
/*
//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
export const createGroupChat = async (req: AuthenticatedRequest, res: Response) => {
  const { users, name }: { users: string; name: string } = req.body;

  if (!users || !name) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const parsedUsers: string[] = JSON.parse(users);
  if (parsedUsers.length < 2) {
    return res.status(400).json({ message: "More than 2 users are required to form a group chat" });
  }

  parsedUsers.push(req.user?._id.toString());

  try {
    const groupChat = await Conversation.create({
      chatName: name,
      users: parsedUsers.map(id => new mongoose.Types.ObjectId(id)),
      isGroupChat: true,
      groupAdmin: req.user?._id,
    });

    const fullGroupChat = await Conversation.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(201).json(fullGroupChat);
  } catch (error: any) {
    console.error("Error creating group chat:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//@description     Rename Group
//@route           PUT /api/chat/rename
//@access          Protected
export const renameGroup = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { chatId, chatName }: { chatId: string; chatName: string } = req.body;

  try {
    const updatedChat = await Conversation.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.json(updatedChat);
  } catch (error: any) {
    console.error("Error renaming group:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
*/
