import { TokenRegistration } from "../../models/TokenRegistration/types";

export const tokenRegistrationModelResponse: Array<keyof TokenRegistration> = [
  "title",
  "expiresIn",
  "_id",
  "permissions",
  "used",
  "token",
  "userId",
  "createdAt",
  "updatedAt",
];
