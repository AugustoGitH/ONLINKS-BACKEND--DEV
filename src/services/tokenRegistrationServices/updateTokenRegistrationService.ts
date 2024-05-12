import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { UpdateLinkPage } from "../../models/LinkPage/types";
import TokenRegistration from "../../models/TokenRegistration";
import {
  TokenRegistration as ITokenRegistration,
  UpdateTokenRegistration,
} from "../../models/TokenRegistration/types";

const updateTokenRegistrationService = async (
  tokenRegistrationFields: UpdateTokenRegistration,
  tokenRegistrationId: string,
  userId?: string
): Promise<ITokenRegistration> => {
  try {
    const tokenRegistrationUpdated = await TokenRegistration.findOneAndUpdate(
      {
        _id: tokenRegistrationId,
        ...(userId && { userId }),
      },
      tokenRegistrationFields,
      {
        new: true,
      }
    );

    if (!tokenRegistrationUpdated) {
      throw new AppError("token registration not found", 404);
    }

    return tokenRegistrationUpdated;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while updating a token registration");
  }
};

export default updateTokenRegistrationService;
