import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { LinkPage as ILinkPage } from "../../models/LinkPage/types";

const findAllLinkPagesService = async (
  userId?: string
): Promise<ILinkPage[]> => {
  try {
    const linkPages = await LinkPage.find({
      ...(userId && { userId }),
    });
    return linkPages;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when fetching link pages");
  }
};

export default findAllLinkPagesService;
