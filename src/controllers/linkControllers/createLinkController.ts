import { NextFunction, Request, Response } from "express";
import { CreateLink } from "../../models/Link/types";
import { validateCreateLinkSchema } from "../../models/Link/validation";
import { AppError } from "../../helpers/errors/AppError";
import findOneLinkPageByIdService from "../../services/linkPageServices/findOneLinkPageByIdService";
import findAllLinkService from "../../services/linkServices/findAllLinkService";
import { Permission } from "../../permissions/types";

import validateProbableLinkPropertyConflict from "../../helpers/validations/link/validateProbableLinkPropertyConflict";
import validateAndCreateShortenedLinkForLink from "../../helpers/validations/link/validateAndCreateShortenedLinkForLink";
import createLinkService from "../../services/linkServices/createLinkService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkModelResponse } from "./models";
import validateLinkCreationLimit from "../../helpers/validations/link/validateLinkCreationLimit";

type linkForCreationBody = Omit<CreateLink, "userId" | "short">;

const createLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const linkForCreationBody: linkForCreationBody = req.body;

    const { error } = validateCreateLinkSchema(linkForCreationBody);

    if (error) throw new AppError(error.message);

    const linkLinkPageExists = await findOneLinkPageByIdService(
      linkForCreationBody.linkPageId,
      req.user.id
    );

    if (!linkLinkPageExists)
      throw new AppError("Link page does not exist", 404);

    const linkForCreationExists = await findAllLinkService({
      linkPageId: linkLinkPageExists._id,
    });

    validateLinkCreationLimit(
      req.user.permissions as Permission[],
      linkForCreationExists.length
    );

    await validateProbableLinkPropertyConflict(
      {
        href: linkForCreationBody.href,
        title: linkForCreationBody.title,
      },
      linkLinkPageExists._id
    );

    const shortenedLinkCreated = await validateAndCreateShortenedLinkForLink(
      {
        href: linkForCreationBody.href,
        title: linkForCreationBody.title,
        userId: req.user.id,
      },
      req.user.permissions as Permission[]
    );

    const linkCreated = await createLinkService({
      ...linkForCreationBody,
      userId: req.user.id,
      short: shortenedLinkCreated?.short ?? null,
    });

    res
      .status(201)
      .json(extractModelProperties(linkCreated, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export default createLinkController;
