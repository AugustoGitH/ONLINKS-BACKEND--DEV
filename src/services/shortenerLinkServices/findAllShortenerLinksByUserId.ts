import { api } from "../../config/api/axios";
import { shortenerOnlinksRoutes } from "../../config/api/routes/shortenerOnlinksRoutes";
import { AppError } from "../../helpers/errors/AppError";
import verifyAxiosErrorMessage from "../../helpers/verify-axios-error-message";
import { CreateShortenerLink, ShortenerLink } from "../../types/ShortenerLink";

const findAllShortenerLinksByUserId = async (
  userId: string
): Promise<ShortenerLink[]> => {
  try {
    const { data } = await api.shortenerOnlinks.get<ShortenerLink[]>(
      shortenerOnlinksRoutes.getAllByUserId(userId)
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new AppError(
      verifyAxiosErrorMessage(error) ||
        "An internal server error occurred when finded links!"
    );
  }
};

export default findAllShortenerLinksByUserId;
