import { Schema, model } from "mongoose";
import { ThemePage } from "./enums";
import { LinkPage } from "./types";

const linkPageSchema = new Schema<LinkPage>(
  {
    title: { type: String, required: true },
    subTitle: { type: String, default: null },
    description: { type: String, default: null },
    profile: { type: String, default: null },
    banner: { type: String, default: null },
    theme: { type: String, default: ThemePage.DEFAULT },
    isDefault: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<LinkPage>("LinkPage", linkPageSchema);
