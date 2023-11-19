import { Document } from "mongoose";

export interface Link extends Document {
  title: string;
  href: string;
  icon: string;
  linkPageId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLink
  extends Pick<Link, "title" | "href" | "icon" | "linkPageId" | "userId"> {}

export interface UpdateLink
  extends Partial<Omit<CreateLink, "userId" | "linkPageId">> {}
