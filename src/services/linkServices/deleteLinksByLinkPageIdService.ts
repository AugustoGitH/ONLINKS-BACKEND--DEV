import { AppError } from "../../helpers/errors/AppError";
import Link from "../../models/Link";
import LinkPage from "../../models/LinkPage";

const deleteLinksByLinkPageIdService = async (
  linkPageId: string,
  userId?: string
) => {
  try {
    const linkDeleted = await Link.deleteMany({
      linkPageId,
      ...(userId && { userId }),
    });

    return linkDeleted;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while deleting link");
  }
};

export default deleteLinksByLinkPageIdService;
