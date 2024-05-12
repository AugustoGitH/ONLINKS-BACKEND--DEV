import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import findOneLinkByIdService from "../../services/linkServices/findOneLinkByIdService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { tokenRegistrationModelResponse } from "./models";
import findOneByIdTokenRegistrationService from "../../services/tokenRegistrationServices/findOneByIdTokenRegistrationService";

const getTokenRegistrationDetailRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: tokenRegistrationid } = req.params;

    if (!tokenRegistrationid) throw new AppError("ID is required!");

    const tokenRegistration = await findOneByIdTokenRegistrationService(
      tokenRegistrationid,
      req.user.id
    );

    if (!tokenRegistration)
      throw new AppError("Token registration not found", 404);

    res
      .status(200)
      .json(
        extractModelProperties(
          tokenRegistration,
          tokenRegistrationModelResponse
        )
      );
  } catch (error) {
    next(error);
  }
};

export default getTokenRegistrationDetailRestrictController;
