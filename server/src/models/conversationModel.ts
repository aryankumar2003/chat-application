import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the conversation document
export interface IConversation extends Document {
    conversationName:String;
  participants: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

// Define the schema
const conversationSchema = new Schema<IConversation>(
  {
    conversationName:{type:String},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create the model
const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;
