import { Schema, model } from "mongoose";

const linkSchema = new Schema(
  {
    title: { type: String, required: true },
    href: { type: String, required: true },
    icon: { type: String, required: true },
    linkPageId: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Link", linkSchema);
