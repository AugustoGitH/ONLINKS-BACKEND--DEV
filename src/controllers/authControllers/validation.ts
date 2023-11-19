import Joi from "@hapi/joi";
import { LoginUser, RegisterUser } from "./types";

export const validateLoginSchema = (user: LoginUser) => {
  const schema = Joi.object({
    email: Joi.string().required().email().min(4).max(200),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
      .message(
        "The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 6 characters long."
      ),
  });

  return schema.validate(user);
};

export const validateRegisterSchema = (user: RegisterUser) => {
  const schema = Joi.object({
    username: Joi.string().required().min(4).max(100),
    name: Joi.string().required().min(4).max(200),
    email: Joi.string().required().email().min(4).max(200),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
      .message(
        "The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 6 characters long."
      ),
  });

  return schema.validate(user);
};
