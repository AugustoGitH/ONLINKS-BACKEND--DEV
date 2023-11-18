import { Document } from "mongoose";
import { User } from "../../models/User/types";

export const userModelResponse: Array<keyof (User & Document)> = [
  "_id",
  "name",
  "email",
  "permissions",
  "createdAt",
  "updatedAt",
];
