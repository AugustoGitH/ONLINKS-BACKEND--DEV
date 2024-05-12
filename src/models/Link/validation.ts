import Joi from "@hapi/joi";
import { CreateLink, UpdateLink } from "./types";
import { urlRegex } from "../../regex/urlRegex";

export const validateCreateLinkSchema = (
  link: Omit<CreateLink, "userId" | "short">
) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(100),
    order: Joi.number().required(),
    href: Joi.string().required().regex(urlRegex).message("Invalid url!"),
    icon: Joi.string().allow(null),
    linkPageId: Joi.string().required(),
  });

  return schema.validate(link);
};

export const validateUpdateLinkSchema = (link: UpdateLink) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(100),
    order: Joi.number(),
    href: Joi.string().regex(urlRegex).message("Invalid url!"),
    icon: Joi.string().allow(null),
  });

  return schema.validate(link);
};
