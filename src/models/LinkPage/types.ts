import { Document } from "mongoose";
import { ThemePage } from "./enums";

export interface LinkPage extends Document {
  title: string;
  subTitle: string | null;
  description: string | null;
  profile: string | null;
  banner: string | null;
  theme: ThemePage;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLinkPage extends Pick<LinkPage, "title"> {
  subTitle?: string;
  description?: string;
  profile?: string;
  banner?: string;
}

export interface UpdateLinkPage extends Partial<CreateLinkPage> {}
