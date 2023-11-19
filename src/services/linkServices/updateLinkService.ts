import { AppError } from "../../helpers/errors/AppError";
import Link from "../../models/Link";
import { UpdateLink } from "../../models/Link/types";

const updateLinkService = async (
  linkFields: UpdateLink,
  linkId: string,
  userId?: string
) => {
  try {
    const linkUpdated = await Link.findOneAndUpdate(
      { _id: linkId, ...(userId && { userId }) },
      linkFields,
      {
        new: true,
      }
    );

    if (!linkUpdated) {
      throw new AppError("link page not found");
    }

    return linkUpdated;
  } catch (error) {
    console.error(error);
    if (error instanceof AppError) {
      throw new AppError(error.message, error.statusCode);
    }
    throw new AppError("An error occurred while updating a link");
  }
};

export default updateLinkService;
