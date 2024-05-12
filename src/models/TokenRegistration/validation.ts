import Joi from "@hapi/joi";
import { CreateTokenRegistration, UpdateTokenRegistration } from "./types";
import validPermissions from "../../helpers/validPermissions";

export const validateTokenRegistrationchema = (
  tokenRegistration: Omit<CreateTokenRegistration, "token" | "userId">
) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(200),
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
      })
      .required(),
    expiresIn: Joi.string()
      .required()
      .custom((expiresIn, helpers) => {
        const days = Number(expiresIn.replace("d", ""));

        if (days > 5) {
          return helpers.message(
            "The expiration time cannot exceed 5 days" as any
          );
        }

        return expiresIn;
      }),
  });

  return schema.validate(tokenRegistration);
};

export const validateUpdateTokenRegistrationchema = (
  tokenRegistration: UpdateTokenRegistration
) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(200),
  });

  return schema.validate(tokenRegistration);
};
