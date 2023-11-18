import Joi from "@hapi/joi";
import { CreateLinkPage, UpdateLinkPage } from "./types";

export const validateCreateLinkPageSchema = (linkPage: CreateLinkPage) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(200),
    subTitle: Joi.string().min(4).max(500),
    description: Joi.string().min(10).max(1000),
    profile: Joi.string(),
    banner: Joi.string(),
  });

  return schema.validate(linkPage);
};

export const validateUpdateLinkPageSchema = (linkPage: UpdateLinkPage) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(200),
    subTitle: Joi.string().min(4).max(500),
    description: Joi.string().min(10).max(1000),
    profile: Joi.string(),
    banner: Joi.string(),
  });

  return schema.validate(linkPage);
};
