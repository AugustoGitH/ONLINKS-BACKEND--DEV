import { AppError } from "../../helpers/errors/AppError";
import Link from "../../models/Link";
import { Link as ILink } from "../../models/Link/types";
import LinkPage from "../../models/LinkPage";
import { LinkPage as ILinkPage } from "../../models/LinkPage/types";

interface FindAllLinkServiceParams {
  linkPageId?: string;
  userId?: string;
}

const findAllLinkService = async ({
  linkPageId,
  userId,
}: FindAllLinkServiceParams): Promise<ILink[]> => {
  try {
    const links = await Link.find({
      ...(linkPageId && { linkPageId }),
      ...(userId && { userId }),
    });
    return links;
  } catch (error) {
    console.error(error);
    throw new AppError("An error occurred when fetching links");
  }
};

export default findAllLinkService;
