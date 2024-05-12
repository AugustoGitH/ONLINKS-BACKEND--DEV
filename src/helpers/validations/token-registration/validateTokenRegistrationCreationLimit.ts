import { Permission } from "../../../permissions/types";
import { AppError } from "../../errors/AppError";
import handlePermissionsLimitLinkCreation from "../../handlePermissionsLimitLinkCreation";
import handlePermissionsLimitTokenRegistrationCreation from "../../handlePermissionsLimitTokenRegistrationCreation";

const validateTokenRegistrationCreationLimit = (
  permissions: Permission[],
  numberOfExistingTokenRegistration: number
) => {
  const tokenRegistrationCreationLimit =
    handlePermissionsLimitTokenRegistrationCreation(permissions);

  if (!tokenRegistrationCreationLimit) {
    throw new AppError("No creation limit was found for your profile", 404);
  }

  if (
    tokenRegistrationCreationLimit !== -666 &&
    numberOfExistingTokenRegistration >= tokenRegistrationCreationLimit
  ) {
    throw new AppError("Limit of broken token registration");
  }
};

export default validateTokenRegistrationCreationLimit;
