import { LinkPage } from "../../models/LinkPage/types";

export const linkPageModelResponse: Array<keyof LinkPage> = [
  "_id",
  "title",
  "subTitle",
  "description",
  "profile",
  "banner",
  "isDefault",
  "theme",
  "userId",
  "createdAt",
  "updatedAt",
];
