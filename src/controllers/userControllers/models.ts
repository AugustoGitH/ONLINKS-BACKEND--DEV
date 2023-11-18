import { User } from "../../models/User/types";

export const userModelResponse: Array<keyof User> = [
  "_id",
  "name",
  "email",
  "permissions",
  "createdAt",
  "updatedAt",
];
