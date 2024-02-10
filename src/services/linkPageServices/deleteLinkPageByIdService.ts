import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";
import deleteLinkByIdService from "../linkServices/deleteLinkByIdService";
import deleteLinksByLinkPageIdService from "../linkServices/deleteLinksByLinkPageIdService";

const deleteLinkPageByIdService = async (
  linkPageId: string,
  userId?: string
) => {
  try {
    const linkPageDeleted = await LinkPage.findOne({
      _id: linkPageId,
      ...(userId && { userId }),
    });
    if (!linkPageDeleted) {
      throw new AppError("Link page not found", 404);
    }

    await deleteLinksByLinkPageIdService(linkPageId, userId);

    await linkPageDeleted.deleteOne();

    return linkPageDeleted;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while deleting link page");
  }
};

export default deleteLinkPageByIdService;
