import { Schema, model } from "mongoose";
import { Link } from "./types";

const linkSchema = new Schema<Link>(
  {
    title: { type: String, required: true },
    href: { type: String, required: true },
    icon: { type: String, default: null, required: false },
    linkPageId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<Link>("Link", linkSchema);
