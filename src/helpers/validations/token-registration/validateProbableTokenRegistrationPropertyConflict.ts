import { CreateLink } from "../../../models/Link/types";
import { CreateTokenRegistration } from "../../../models/TokenRegistration/types";
import findOneLinkByHrefService from "../../../services/linkServices/findOneLinkByHrefService";
import findOneLinkByTitleService from "../../../services/linkServices/findOneLinkByTitleService";
import findOneByTitleTokenRegistrationService from "../../../services/tokenRegistrationServices/findOneByTitleTokenRegistrationService";
import { AppError } from "../../errors/AppError";

const validateProbableTokenRegistrationPropertyConflict = async (
  tokenRegistration: Partial<Pick<CreateTokenRegistration, "title">>,
  userId?: string
) => {
  if (tokenRegistration.title) {
    const linkTitleExists = await findOneByTitleTokenRegistrationService(
      tokenRegistration.title,
      userId
    );

    if (linkTitleExists) {
      throw new AppError(
        "A token registration with the same title already exists"
      );
    }
  }
};

export default validateProbableTokenRegistrationPropertyConflict;
