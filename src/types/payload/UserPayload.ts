import { Permission } from "../../permissions/types";

export interface UserPayload {
  email: string;
  name: string;
  permissions: Permission[];
  id: string;
  iat?: number;
  exp?: number;
}
