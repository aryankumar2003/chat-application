"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchConversation = exports.accessConversation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const asyncHandler_1 = require("../utils/asyncHandler");
//@description     Create or fetch One-to-One Chat
//@route           POST /api/chat/
//@access          Protected
exports.accessConversation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body; // The user you want to start a chat with
        const loggedInUserId = req.user._id; // The logged-in user
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        // ✅ Ensure both userIds are ObjectId
        const participants = [
            new mongoose_1.default.Types.ObjectId(userId),
            new mongoose_1.default.Types.ObjectId(loggedInUserId),
        ];
        // Find existing conversation
        let conversation = yield conversationModel_1.default.findOne({
            participants: { $all: participants },
        })
            .populate("participants", "-password") // Populate users but exclude passwords
            .populate("lastMessage");
        // If no conversation exists, create one
        if (!conversation) {
            conversation = new conversationModel_1.default({
                participants,
            });
            yield conversation.save();
            conversation = yield conversation.populate("participants", "-password");
        }
        res.status(200).json(conversation);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
exports.fetchConversation = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const conversation = yield conversationModel_1.default.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("participants", "-password")
            .populate("lastMessage")
            .sort({ updatedAt: -1 });
        const populatedChats = yield usersModel_1.default.populate(conversation, {
            path: "lastMessage.sender",
            select: "name profilephoto email",
        });
        return res.status(200).json(populatedChats);
    }
    catch (error) {
        console.error("Error fetching chats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
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
