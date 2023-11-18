import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { LinkPage as ILinkPage } from "../../models/LinkPage/types";

const findAllLinkPagesService = async (): Promise<ILinkPage[]> => {
  try {
    const linkPages = await LinkPage.find({});
    return linkPages;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when fetching link pages");
  }
};

export default findAllLinkPagesService;
