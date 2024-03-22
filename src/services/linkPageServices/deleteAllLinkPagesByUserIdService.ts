import { AppError } from "../../helpers/errors/AppError";
import Link from "../../models/Link";
import LinkPage from "../../models/LinkPage";

const deleteAllLinkPagesByUserIdService = async (userId: string) => {
  try {
    const linkPagesDeleted = await LinkPage.deleteMany({
      userId,
    });

    return linkPagesDeleted;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while deleting link pages");
  }
};

export default deleteAllLinkPagesByUserIdService;
