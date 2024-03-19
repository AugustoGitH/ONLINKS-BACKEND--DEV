import { PermissionRoutesLimitLinkCreationEnum } from "../permissions/enums";
import { groupPermissionLimitLinkCreation } from "../permissions/groups";
import { limitsCreationLink } from "../permissions/limits";
import { PermissionRoutesLimitLinkCreation } from "../permissions/types";

const handlePermissionsLimitLinkCreation = (permissions: string[]) => {
  const limitFinded = permissions.includes(
    PermissionRoutesLimitLinkCreationEnum.UNLIMITED_LINK_CREATION
  )
    ? PermissionRoutesLimitLinkCreationEnum.UNLIMITED_LINK_CREATION
    : permissions.find((p) =>
        groupPermissionLimitLinkCreation.includes(
          p as PermissionRoutesLimitLinkCreation
        )
      );

  return !limitFinded
    ? null
    : limitsCreationLink[limitFinded as PermissionRoutesLimitLinkCreation];
};

export default handlePermissionsLimitLinkCreation;
