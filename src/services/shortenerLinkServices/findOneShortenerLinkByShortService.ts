import { api } from "../../config/api/axios";
import { shortenerOnlinksRoutes } from "../../config/api/routes/shortenerOnlinksRoutes";
import { AppError } from "../../helpers/errors/AppError";
import verifyAxiosErrorMessage from "../../helpers/verify-axios-error-message";
import { CreateShortenerLink, ShortenerLink } from "../../types/ShortenerLink";

const findOneShortenerLinkByShortService = async (
  short: string
): Promise<ShortenerLink | null> => {
  try {
    const { data } = await api.shortenerOnlinks.get<ShortenerLink | null>(
      shortenerOnlinksRoutes.getOneByShort(short)
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new AppError(
      verifyAxiosErrorMessage(error) ||
        "An internal server error occurred when finded shortener link by short!"
    );
  }
};

export default findOneShortenerLinkByShortService;
