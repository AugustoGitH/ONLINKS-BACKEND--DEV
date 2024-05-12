import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import findAllLinkService from "../../services/linkServices/findAllLinkService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { tokenRegistrationModelResponse } from "./models";
import findAllTokenRegistrationsService from "../../services/tokenRegistrationServices/findAllTokenRegistrationsService";

const getTokenRegistrationAllController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) throw new AppError("User id is required");

    const tokenRegistrations = await findAllTokenRegistrationsService(userId);

    res
      .status(200)
      .json(
        extractModelProperties(
          tokenRegistrations,
          tokenRegistrationModelResponse
        )
      );
  } catch (error) {
    next(error);
  }
};

export default getTokenRegistrationAllController;
