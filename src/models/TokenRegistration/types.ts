import { Document } from "mongoose";
import { Permission } from "../../permissions/types";

export interface TokenRegistration extends Document {
  title: string;
  userId: string;
  token: string;
  expiresIn: string | number | null;
  permissions: Permission[];
  used: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTokenRegistration
  extends Pick<
    TokenRegistration,
    "title" | "userId" | "expiresIn" | "permissions" | "token"
  > {}

export interface UpdateTokenRegistration
  extends Partial<CreateTokenRegistration & { used: boolean }> {}
