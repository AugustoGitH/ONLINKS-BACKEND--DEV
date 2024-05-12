import { AppError } from "../../helpers/errors/AppError";

import TokenRegistration from "../../models/TokenRegistration";
import {
  CreateTokenRegistration,
  TokenRegistration as ITokenRegistration,
} from "../../models/TokenRegistration/types";

const createTokenRegistrationService = async (
  tokenRegistration: CreateTokenRegistration
): Promise<ITokenRegistration> => {
  try {
    const newTokenRegistration = tokenRegistration;

    const tokenRegistrationCreated = await new TokenRegistration(
      newTokenRegistration
    ).save();

    return tokenRegistrationCreated;
  } catch (error) {
    console.error(error);
    throw new AppError(
      "An error occurred while creating a new token registration"
    );
  }
};

export default createTokenRegistrationService;
