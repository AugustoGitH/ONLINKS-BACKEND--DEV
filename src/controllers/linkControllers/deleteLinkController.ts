import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import deleteLinkByIdService from "../../services/linkServices/deleteLinkByIdService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkModelResponse } from "./models";
import validateAndDeleteShortenedLinkForLink from "../../helpers/validations/link/validateAndDeleteShortenedLinkForLink";
import { Permission } from "../../permissions/types";

const deleteLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new AppError("Id is required");
    }
    const linkDeleted = await deleteLinkByIdService(id);

    await validateAndDeleteShortenedLinkForLink(
      linkDeleted.short ?? undefined,
      req.user.permissions as Permission[]
    );

    res
      .status(200)
      .json(extractModelProperties(linkDeleted, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export default deleteLinkController;
