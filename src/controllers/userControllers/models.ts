import { User } from "../../models/User/types";

export const userModelResponse: Array<keyof User> = [
  "_id",
  "name",
  "email",
  "username",
  "permissions",
  "createdAt",
  "updatedAt",
];
