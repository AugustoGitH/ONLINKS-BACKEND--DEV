import Joi from "@hapi/joi";
import { CreateLink, UpdateLink } from "./types";

export const validateCreateLinkSchema = (link: Omit<CreateLink, "userId">) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(100),
    order: Joi.number().required(),
    href: Joi.string()
      .required()
      .regex(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
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
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    ),
    icon: Joi.string().allow(null),
  });

  return schema.validate(link);
};
