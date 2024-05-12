import {
  PermissionRoutesLimitLinkCreationEnum,
  PermissionRoutesLimitTokenRegistrationCreationEnum,
} from "../permissions/enums";
import {
  groupPermissionLimitLinkCreation,
  groupPermissionRoutesLimitTokenRegistrationCreation,
} from "../permissions/groups";
import {
  limitsCreationLink,
  limitsCreationTokenRegistration,
} from "../permissions/limits";
import {
  PermissionRoutesLimitLinkCreation,
  PermissionRoutesLimitTokenRegistrationCreation,
} from "../permissions/types";

const handlePermissionsLimitTokenRegistrationCreation = (
  permissions: string[]
) => {
  const limitFinded = permissions.includes(
    PermissionRoutesLimitTokenRegistrationCreationEnum.UNLIMITED_TOKEN_REGISTRATION_CREATION
  )
    ? PermissionRoutesLimitTokenRegistrationCreationEnum.UNLIMITED_TOKEN_REGISTRATION_CREATION
    : permissions.find((p) =>
        groupPermissionRoutesLimitTokenRegistrationCreation.includes(
          p as PermissionRoutesLimitTokenRegistrationCreationEnum
        )
      );

  return !limitFinded
    ? null
    : limitsCreationTokenRegistration[
        limitFinded as PermissionRoutesLimitTokenRegistrationCreationEnum
      ];
};

export default handlePermissionsLimitTokenRegistrationCreation;
