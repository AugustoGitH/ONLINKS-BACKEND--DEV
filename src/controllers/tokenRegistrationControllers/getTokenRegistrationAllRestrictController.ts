import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import findAllLinkService from "../../services/linkServices/findAllLinkService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { tokenRegistrationModelResponse } from "./models";
import findAllTokenRegistrationsService from "../../services/tokenRegistrationServices/findAllTokenRegistrationsService";

const getTokenRegistrationAllRestrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenRegistrations = await findAllTokenRegistrationsService(
      req.user.id
    );

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

export default getTokenRegistrationAllRestrictController;
