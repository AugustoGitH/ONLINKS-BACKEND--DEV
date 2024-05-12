import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import deleteLinkByIdService from "../../services/linkServices/deleteLinkByIdService";
import extractModelProperties from "../../helpers/extractModelProperties";

import validateAndDeleteShortenedLinkForLink from "../../helpers/validations/link/validateAndDeleteShortenedLinkForLink";
import { Permission } from "../../permissions/types";
import { tokenRegistrationModelResponse } from "./models";
import deleteTokenRegistrationService from "../../services/tokenRegistrationServices/deleteTokenRegistrationService";

const deleteTokenRegistrationRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Id is required");
    }
    const tokenRegistrationDeleted = await deleteTokenRegistrationService(
      id,
      req.user.id
    );

    res
      .status(200)
      .json(
        extractModelProperties(
          tokenRegistrationDeleted,
          tokenRegistrationModelResponse
        )
      );
  } catch (error) {
    next(error);
  }
};

export default deleteTokenRegistrationRestrictController;
