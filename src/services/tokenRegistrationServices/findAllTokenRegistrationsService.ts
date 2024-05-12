import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { LinkPage as ILinkPage } from "../../models/LinkPage/types";
import TokenRegistration from "../../models/TokenRegistration";
import { TokenRegistration as ITokenRegistration } from "../../models/TokenRegistration/types";

const findAllTokenRegistrationsService = async (
  userId?: string
): Promise<ITokenRegistration[]> => {
  try {
    const tokenRegistrations = await TokenRegistration.find({
      ...(userId && { userId }),
    });
    return tokenRegistrations;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when fetching registration service");
  }
};

export default findAllTokenRegistrationsService;
