import { Schema, model } from "mongoose";
import { TokenRegistration } from "./types";

const TokenRegistrationSchema = new Schema<TokenRegistration>(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
    token: { type: String, required: true },
    expiresIn: { type: String, required: true },
    used: { type: Boolean, required: false, default: false },
    permissions: {
      type: [{ type: String }],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<TokenRegistration>(
  "TokenRegistration",
  TokenRegistrationSchema
);
