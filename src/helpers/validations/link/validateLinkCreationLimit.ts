import { Permission } from "../../../permissions/types";
import { AppError } from "../../errors/AppError";
import handlePermissionsLimitLinkCreation from "../../handlePermissionsLimitLinkCreation";

const validateLinkCreationLimit = (
  permissions: Permission[],
  numberOfExistingLinks: number
) => {
  const linkCreationLimit = handlePermissionsLimitLinkCreation(permissions);

  if (!linkCreationLimit) {
    throw new AppError("No creation limit was found for your profile", 404);
  }

  if (
    linkCreationLimit !== -666 &&
    numberOfExistingLinks >= linkCreationLimit
  ) {
    throw new AppError("Limit of broken links");
  }
};

export default validateLinkCreationLimit;
