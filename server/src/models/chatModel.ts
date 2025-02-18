import mongoose from "mongoose";

const chatModel=new mongoose.Schema({
    sender:{type:mongoose.Schema.ObjectId},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"Conversation"},
    time:{type:Date},
    isreaded:{type:Boolean},
    content:{type:String}
});
const Chat=mongoose.model("chat",chatModel);
export default Chat;