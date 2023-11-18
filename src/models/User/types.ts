import { Document } from "mongoose";
import { Permission } from "../../permissions/types";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUser
  extends Pick<User, "name" | "email" | "password" | "permissions"> {}

export interface UpdateUser extends Partial<CreateUser> {}
