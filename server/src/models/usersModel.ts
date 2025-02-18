import mongoose, { Schema, Document } from "mongoose";

// Define the IUser interface
export interface IUser extends Document {
  username: string;
  phone: number;
  password?: string;
  profilephoto?: string;
  onlinestatus?: boolean;
  lastonline?: Date;
}

// Define the Mongoose Schema for User
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String },
  profilephoto: { type: String, default: "" },
  onlinestatus: { type: Boolean, default: false },
  lastonline: { type: Date, default: null },
});

// Create the Mongoose model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
