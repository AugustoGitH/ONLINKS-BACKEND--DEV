import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import { UpdateLinkPage } from "../../models/LinkPage/types";

const updateLinkPageService = async (
  linkPageFields: UpdateLinkPage,
  linkPageId: string,
  userId?: string
) => {
  try {
    const linkPageUpdated = await LinkPage.findOneAndUpdate(
      { _id: linkPageId, ...(userId && { userId }) },
      linkPageFields,
      {
        new: true,
      }
    );

    if (!linkPageUpdated) {
      throw new AppError("link page not found", 404);
    }

    return linkPageUpdated;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while updating a link page");
  }
};

export default updateLinkPageService;
