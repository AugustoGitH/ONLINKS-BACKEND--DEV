import { UpdateLink } from "../../../models/Link/types";
import { PermissionShortenerLinkEnum } from "../../../permissions/enums";
import { Permission } from "../../../permissions/types";
import findOneShortenerLinkByShortService from "../../../services/shortenerLinkServices/findOneShortenerLinkByShortService";
import updateShortenerLinkService from "../../../services/shortenerLinkServices/updateShortenerLinkService";

const validateAndUpdateShortenedLinkForLink = async (
  link: Pick<UpdateLink, "short" | "title" | "href">,
  permissions: Permission[]
) => {
  if (
    permissions.includes(PermissionShortenerLinkEnum.SHORTEN_LINK_PAGE_LINKS)
  ) {
    const shortenedLinkFound = link.short
      ? await findOneShortenerLinkByShortService(link.short)
      : null;
    if (shortenedLinkFound) {
      const shortnerUpdated = await updateShortenerLinkService(
        shortenedLinkFound._id,
        {
          title: link.title,
          originalUrl: link.href,
        }
      );

      return shortnerUpdated;
    }
    return null;
  }
  return null;
};

export default validateAndUpdateShortenedLinkForLink;
