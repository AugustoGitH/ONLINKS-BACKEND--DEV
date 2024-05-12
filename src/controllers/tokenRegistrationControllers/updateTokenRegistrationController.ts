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
import { tokenRegistrationModelResponse } from "./models";
import { UpdateTokenRegistration } from "../../models/TokenRegistration/types";
import { validateUpdateTokenRegistrationchema } from "../../models/TokenRegistration/validation";
import findOneByIdTokenRegistrationService from "../../services/tokenRegistrationServices/findOneByIdTokenRegistrationService";
import validateProbableTokenRegistrationPropertyConflict from "../../helpers/validations/token-registration/validateProbableTokenRegistrationPropertyConflict";
import updateTokenRegistrationService from "../../services/tokenRegistrationServices/updateTokenRegistrationService";

type TokenRegistrationToUpdateBody = Omit<
  UpdateTokenRegistration,
  "userId" | "expiresIn"
>;

const updateTokenRegistrationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenRegistrationToUpdateBody: TokenRegistrationToUpdateBody =
      req.body;

    const { id: tokenRegistrationId } = req.params;

    if (!tokenRegistrationId) throw new AppError("ID is required!");

    const { error } = validateUpdateTokenRegistrationchema(
      tokenRegistrationToUpdateBody
    );

    if (error) throw new AppError(error.message);

    const tokenRegistrationToUpdateExists =
      await findOneByIdTokenRegistrationService(tokenRegistrationId);

    if (!tokenRegistrationToUpdateExists)
      throw new AppError("Link not found", 404);

    await validateProbableTokenRegistrationPropertyConflict({
      title: tokenRegistrationToUpdateBody.title,
    });

    const tokenRegistrationUpdated = await updateTokenRegistrationService(
      tokenRegistrationToUpdateBody,
      tokenRegistrationToUpdateExists._id
    );

    res
      .status(201)
      .json(
        extractModelProperties(
          tokenRegistrationUpdated,
          tokenRegistrationModelResponse
        )
      );
  } catch (error) {
    next(error);
  }
};

export default updateTokenRegistrationController;
