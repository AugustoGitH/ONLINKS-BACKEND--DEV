import { CreateLink } from "../../../models/Link/types";
import { PermissionShortenerLinkEnum } from "../../../permissions/enums";
import { Permission } from "../../../permissions/types";
import createShortenerLinkService from "../../../services/shortenerLinkServices/createShortenerLinkService";

const validateAndCreateShortenedLinkForLink = async (
  link: Pick<CreateLink, "href" | "title" | "userId">,
  permissions: Permission[]
) => {
  if (
    permissions.includes(PermissionShortenerLinkEnum.SHORTEN_LINK_PAGE_LINKS)
  ) {
    const shortenerLinkCreated = await createShortenerLinkService({
      originalUrl: link.href,
      title: link.title,
      userId: link.userId,
    });

    return shortenerLinkCreated;
  }
  return null;
};

export default validateAndCreateShortenedLinkForLink;
