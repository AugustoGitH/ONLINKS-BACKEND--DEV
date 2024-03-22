import { AppError } from "../../helpers/errors/AppError";
import LinkPage from "../../models/LinkPage";

import deleteAllLinksByLinkPageIdService from "../linkServices/deleteAllLinksByLinkPageIdService";

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

    await linkPageDeleted.deleteOne();

    await deleteAllLinksByLinkPageIdService(linkPageId, userId);

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
