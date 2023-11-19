import { AppError } from "../../helpers/errors/AppError";
import Link from "../../models/Link";
import LinkPage from "../../models/LinkPage";

const deleteLinkByIdService = async (linkId: string, userId?: string) => {
  try {
    const linkDeleted = await Link.findOne({
      _id: linkId,
      ...(userId && { userId }),
    });
    if (!linkDeleted) {
      throw new AppError("Link not found", 404);
    }

    await linkDeleted.deleteOne();

    return linkDeleted;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while deleting link");
  }
};

export default deleteLinkByIdService;
