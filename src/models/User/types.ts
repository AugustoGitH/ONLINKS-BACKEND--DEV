import { Document } from "mongoose";
import { Permission } from "../../permissions/types";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUser
  extends Pick<
    User,
    "name" | "email" | "password" | "permissions" | "username"
  > {}

export interface UpdateUser extends Partial<CreateUser> {}
