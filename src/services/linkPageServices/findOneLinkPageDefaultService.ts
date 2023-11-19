import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";

const findOneLinkPageDefaultService = async (userId?: string) => {
  try {
    const linkPageDefault = await LinkPage.findOne({
      isDefault: true,
      ...(userId && { userId }),
    });

    return linkPageDefault;
  } catch (error) {
    console.error(error);
    throw new AppError(
      "An error occurred when searching for link page default"
    );
  }
};

export default findOneLinkPageDefaultService;
