import mongoose, { Schema } from "mongoose";

export interface User {
  id: string;
  username: string;
  password: string;
  address: string;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
});

export const Users = mongoose.model<User>("User", userSchema, "user_statement");
