import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import TokenRegistration from "../../models/TokenRegistration";
import { TokenRegistration as ITokenRegistration } from "../../models/TokenRegistration/types";

const deleteTokenRegistrationService = async (
  tokenRegistrationId: string,
  userId?: string
): Promise<ITokenRegistration> => {
  try {
    const tokenRegistrationDeleted = await TokenRegistration.findOne({
      _id: tokenRegistrationId,
      ...(userId && { userId }),
    });
    if (!tokenRegistrationDeleted) {
      throw new AppError("Token registration not found", 404);
    }

    await tokenRegistrationDeleted.deleteOne();

    return tokenRegistrationDeleted;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while deleting token registration");
  }
};

export default deleteTokenRegistrationService;
