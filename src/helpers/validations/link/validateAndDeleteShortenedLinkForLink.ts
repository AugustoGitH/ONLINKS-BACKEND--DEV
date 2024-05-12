import { CreateLink } from "../../../models/Link/types";
import { PermissionShortenerLinkEnum } from "../../../permissions/enums";
import { Permission } from "../../../permissions/types";
import deleteShortenerLinkService from "../../../services/shortenerLinkServices/deleteShortenerLinkService";
import findOneShortenerLinkByShortService from "../../../services/shortenerLinkServices/findOneShortenerLinkByShortService";

const validateAndDeleteShortenedLinkForLink = async (
  short: string | undefined,
  permissions: Permission[]
) => {
  if (
    permissions.includes(PermissionShortenerLinkEnum.SHORTEN_LINK_PAGE_LINKS) &&
    short
  ) {
    const shortenerLinkFound = await findOneShortenerLinkByShortService(short);
    if (shortenerLinkFound) {
      const shortenerLinkDeleted = await deleteShortenerLinkService(
        shortenerLinkFound._id
      );
      return shortenerLinkDeleted;
    }
    return null;
  }
  return null;
};

export default validateAndDeleteShortenedLinkForLink;
