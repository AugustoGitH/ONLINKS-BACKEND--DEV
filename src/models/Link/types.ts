import { Document } from "mongoose";

export interface Link extends Document {
  title: string;
  order: number;
  href: string;
  icon: string;
  linkPageId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLink
  extends Pick<
    Link,
    "order" | "title" | "href" | "icon" | "linkPageId" | "userId"
  > {}

export interface UpdateLink
  extends Partial<Omit<CreateLink, "userId" | "linkPageId">> {}
