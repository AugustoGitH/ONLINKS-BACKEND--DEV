import Joi from "@hapi/joi";
import { CreateUser, UpdateUser } from "./types";

export const validateCreateUserSchema = (user: CreateUser) => {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(200),
    email: Joi.string().required().email().min(4).max(200),
    permissions: Joi.array().items(Joi.string()),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/),
  });

  return schema.validate(user);
};

export const validateUpdateUserSchema = (user: UpdateUser) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(200),
    email: Joi.string().email().min(4).max(200),
    permissions: Joi.array().items(Joi.string()),
    password: Joi.string().regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/
    ),
  });

  return schema.validate(user);
};
