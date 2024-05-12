import { NextFunction, Request, Response } from "express";
import { CreateTokenRegistration } from "../../models/TokenRegistration/types";
import { validateTokenRegistrationchema } from "../../models/TokenRegistration/validation";
import { AppError } from "../../helpers/errors/AppError";

import { Permission } from "../../permissions/types";
import findAllTokenRegistrationsService from "../../services/tokenRegistrationServices/findAllTokenRegistrationsService";
import validateTokenRegistrationCreationLimit from "../../helpers/validations/token-registration/validateTokenRegistrationCreationLimit";
import validateProbableTokenRegistrationPropertyConflict from "../../helpers/validations/token-registration/validateProbableTokenRegistrationPropertyConflict";
import createTokenRegistrationService from "../../services/tokenRegistrationServices/createTokenRegistrationService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { tokenRegistrationModelResponse } from "./models";
import createJWTRegistrationPreferencesService from "../../services/authServices/createJWTRegistrationPreferencesService";

type TokenRegistrationCreationBody = Omit<
  CreateTokenRegistration,
  "userId" | "token"
>;

const createTokenRegistrationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenRegistrationCreationBody: TokenRegistrationCreationBody =
      req.body;

    const { error } = validateTokenRegistrationchema(
      tokenRegistrationCreationBody
    );

    if (error) throw new AppError(error.message);

    const tokenRegistrationForCreationExists =
      await findAllTokenRegistrationsService(req.user.id);

    validateTokenRegistrationCreationLimit(
      req.user.permissions as Permission[],
      tokenRegistrationForCreationExists.length
    );

    await validateProbableTokenRegistrationPropertyConflict(
      {
        title: tokenRegistrationCreationBody.title,
      },
      req.user.id
    );

    const tokenRegistrationCreated = await createTokenRegistrationService({
      ...tokenRegistrationCreationBody,
      userId: req.user.id,
      token: createJWTRegistrationPreferencesService(
        {
          permissions: tokenRegistrationCreationBody.permissions,
        },
        tokenRegistrationCreationBody.expiresIn ?? undefined
      ),
    });

    res
      .status(201)
      .json(
        extractModelProperties(
          tokenRegistrationCreated,
          tokenRegistrationModelResponse
        )
      );
  } catch (error) {
    next(error);
  }
};

export default createTokenRegistrationController;
