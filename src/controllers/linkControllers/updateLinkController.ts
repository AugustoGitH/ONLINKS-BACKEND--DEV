import { NextFunction, Request, Response } from "express";
import { UpdateLink } from "../../models/Link/types";
import { AppError } from "../../helpers/errors/AppError";
import { validateUpdateLinkSchema } from "../../models/Link/validation";
import findOneLinkByIdService from "../../services/linkServices/findOneLinkByIdService";
import validateProbableLinkPropertyConflict from "../../helpers/validations/link/validateProbableLinkPropertyConflict";
import validateAndUpdateShortenedLinkForLink from "../../helpers/validations/link/validateAndUpdateShortenedLinkForLink";
import { Permission } from "../../permissions/types";
import updateLinkService from "../../services/linkServices/updateLinkService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkModelResponse } from "./models";

type linkToUpdateBody = Omit<UpdateLink, "userId" | "short">;

const updateLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const linkToUpdateBody: linkToUpdateBody = req.body;

    const { id: linkId } = req.params;

    if (!linkId) throw new AppError("ID is required!");

    const { error } = validateUpdateLinkSchema(linkToUpdateBody);

    if (error) throw new AppError(error.message);

    const linkToUpdateExists = await findOneLinkByIdService({
      id: linkId,
    });

    if (!linkToUpdateExists) throw new AppError("Link not found", 404);

    await validateProbableLinkPropertyConflict(
      {
        href: linkToUpdateBody.href,
        title: linkToUpdateBody.title,
      },
      linkToUpdateExists.linkPageId
    );

    const shortenerLinkUpdated = await validateAndUpdateShortenedLinkForLink(
      {
        href: linkToUpdateBody.href,
        title: linkToUpdateBody.title,
        short: linkToUpdateExists.short,
      },
      req.user.permissions as Permission[]
    );

    const linkUpdated = await updateLinkService(
      {
        ...linkToUpdateBody,
        short: shortenerLinkUpdated?.short ?? null,
      },
      linkToUpdateExists._id
    );

    res
      .status(201)
      .json(extractModelProperties(linkUpdated, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export default updateLinkController;
