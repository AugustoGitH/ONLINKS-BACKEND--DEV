import { AppError } from "../../helpers/errors/AppError";
import Link from "../../models/Link";
import { CreateLink, Link as ILink } from "../../models/Link/types";
import TokenRegistration from "../../models/TokenRegistration";
import { TokenRegistration as ITokenRegistration } from "../../models/TokenRegistration/types";

const findOneByTitleTokenRegistrationService = async (
  title: string,
  userId?: string
): Promise<ITokenRegistration | null> => {
  try {
    const tokenRegistrationFinded = await TokenRegistration.findOne({
      title: title,
      ...(userId && { userId }),
    });

    return tokenRegistrationFinded;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred while finded a token regitration");
  }
};

export default findOneByTitleTokenRegistrationService;
