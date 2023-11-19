import { Schema, model } from "mongoose";
import { User } from "./types";

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    permissions: {
      type: [{ type: String }],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<User>("User", userSchema);
