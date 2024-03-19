import { LinkPage } from "../../models/LinkPage/types";

export const linkPageModelResponse: Array<keyof LinkPage | "links"> = [
  "_id",
  "title",
  "subTitle",
  "order",
  "description",
  "profile",
  "banner",
  "isDefault",
  "theme",
  "userId",
  "createdAt",
  "updatedAt",
  "links",
];
