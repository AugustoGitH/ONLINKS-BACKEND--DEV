import Joi, { LanguageMessages } from "@hapi/joi";
import { CreateUser, UpdateUser } from "./types";
import validPermissions from "../../helpers/validPermissions";

export const validateCreateUserSchema = (user: CreateUser) => {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(200),
    username: Joi.string().required().min(4).max(100),
    email: Joi.string().required().email().min(4).max(200),
    permissions: Joi.array()
      .items(Joi.string())
      .custom((permissions, helpers) => {
        if (permissions) {
          const verifyPermissions = validPermissions(permissions);

          if (verifyPermissions) {
            return helpers.message(
              `${verifyPermissions.message}: '${verifyPermissions.permission}'` as any
            );
          }
        }
        return permissions;
      }),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
      .message(
        "The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 6 characters long."
      ),
  });

  return schema.validate(user);
};

export const validateUpdateUserSchema = (user: UpdateUser) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(200),
    username: Joi.string().min(4).max(100),
    email: Joi.string().email().min(4).max(200),
    permissions: Joi.array()
      .items(Joi.string())
      .custom((permissions, helpers) => {
        if (permissions) {
          const verifyPermissions = validPermissions(permissions);

          if (verifyPermissions) {
            return helpers.message(
              `${verifyPermissions.message}: '${verifyPermissions.permission}'` as any
            );
          }
        }
        return permissions;
      }),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
      .message(
        "The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 6 characters long."
      ),
  });

  return schema.validate(user);
};
