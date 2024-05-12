import { CreateLink } from "../../../models/Link/types";
import findOneLinkByHrefService from "../../../services/linkServices/findOneLinkByHrefService";
import findOneLinkByTitleService from "../../../services/linkServices/findOneLinkByTitleService";
import { AppError } from "../../errors/AppError";

const validateProbableLinkPropertyConflict = async (
  link: Partial<Pick<CreateLink, "title" | "href">>,
  linkPageId: string
) => {
  if (link.title) {
    const linkTitleExists = await findOneLinkByTitleService({
      title: link.title,
      linkPageId,
    });

    if (linkTitleExists) {
      throw new AppError("A link with the same title already exists");
    }
  }

  if (link.href) {
    const linkHrefExists = await findOneLinkByHrefService({
      href: link.href,
      linkPageId,
    });

    if (linkHrefExists) {
      throw new AppError("A link with the same url already exists");
    }
  }
};

export default validateProbableLinkPropertyConflict;
