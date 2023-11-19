import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import {
  CreateLinkPage,
  LinkPage as ILinkPage,
} from "../../models/LinkPage/types";

const createLinkPageService = async (
  linkPage: CreateLinkPage
): Promise<ILinkPage> => {
  try {
    const newLinkPage = linkPage;

    const linkPageCreated = await new LinkPage(newLinkPage).save();

    return linkPageCreated;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred while creating a new link page");
  }
};

export default createLinkPageService;
