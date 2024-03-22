import { api } from "../../config/api/axios";
import { shortenerOnlinksRoutes } from "../../config/api/routes/shortenerOnlinksRoutes";
import { AppError } from "../../helpers/errors/AppError";
import verifyAxiosErrorMessage from "../../helpers/verify-axios-error-message";
import {
  CreateShortenerLink,
  ShortenerLink,
  UpdateShortenerLink,
} from "../../types/ShortenerLink";

const updateShortenerLinkService = async (
  shortenerLinkId: string,
  updateShortenerLink: UpdateShortenerLink
): Promise<ShortenerLink> => {
  try {
    const { data } = await api.shortenerOnlinks.patch<ShortenerLink>(
      shortenerOnlinksRoutes.getUpdate(shortenerLinkId),
      updateShortenerLink
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new AppError(
      verifyAxiosErrorMessage(error) ||
        "An internal server error occurred when update link!"
    );
  }
};

export default updateShortenerLinkService;
