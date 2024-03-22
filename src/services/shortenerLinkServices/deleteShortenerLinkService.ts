import { api } from "../../config/api/axios";
import { shortenerOnlinksRoutes } from "../../config/api/routes/shortenerOnlinksRoutes";
import { AppError } from "../../helpers/errors/AppError";
import verifyAxiosErrorMessage from "../../helpers/verify-axios-error-message";
import { ShortenerLink } from "../../types/ShortenerLink";

const deleteShortenerLinkService = async (
  id: string
): Promise<ShortenerLink> => {
  try {
    const { data } = await api.shortenerOnlinks.delete<ShortenerLink>(
      shortenerOnlinksRoutes.getDelete(id)
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new AppError(
      verifyAxiosErrorMessage(error) ||
        "An internal server error occurred when delete link!"
    );
  }
};

export default deleteShortenerLinkService;
