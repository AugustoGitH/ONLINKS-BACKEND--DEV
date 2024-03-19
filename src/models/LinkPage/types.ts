import { Document } from "mongoose";
import { ThemePage } from "./enums";

export interface LinkPage extends Document {
  title: string;
  subTitle: string | null;
  description: string | null;
  profile: string | null;
  banner: string | null;
  theme: ThemePage;
  isDefault: boolean;
  order: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateLinkPage = Pick<
  LinkPage,
  "title" | "userId" | "isDefault" | "order"
> &
  Partial<Pick<LinkPage, "subTitle" | "description" | "profile" | "banner">>;

export interface UpdateLinkPage extends Partial<CreateLinkPage> {}
