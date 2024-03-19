import Joi from "@hapi/joi";
import { CreateLink, UpdateLink } from "./types";

export const validateCreateLinkSchema = (link: Omit<CreateLink, "userId">) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(100),
    order: Joi.number().required(),
    href: Joi.string()
      .required()
      .regex(
        /^(https?:\/\/)?([\w\d]+\.)?[\w\d-]+(\.[\w\d]{2,})+([\w\d-._~:/?#[\]@!$&'()*+,;=]+)?$/i
      ),
    icon: Joi.string().allow(null),
    linkPageId: Joi.string().required(),
  });

  return schema.validate(link);
};

export const validateUpdateLinkSchema = (link: UpdateLink) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(100),
    order: Joi.number(),
    href: Joi.string().regex(
      /^(https?:\/\/)?([\w\d]+\.)?[\w\d-]+(\.[\w\d]{2,})+([\w\d-._~:/?#[\]@!$&'()*+,;=]+)?$/i
    ),
    icon: Joi.string().allow(null),
  });

  return schema.validate(link);
};
