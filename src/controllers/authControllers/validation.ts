import Joi from "@hapi/joi";
import { LoginUser, RegisterUser } from "./types";

export const validateLoginSchema = (user: LoginUser) => {
  const schema = Joi.object({
    email: Joi.string().required().email().min(4).max(200),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/),
  });

  return schema.validate(user);
};

export const validateRegisterSchema = (user: RegisterUser) => {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(200),
    email: Joi.string().required().email().min(4).max(200),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/),
  });

  return schema.validate(user);
};
