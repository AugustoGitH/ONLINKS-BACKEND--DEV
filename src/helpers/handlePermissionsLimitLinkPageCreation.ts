import { PermissionRoutesLimitLinkPageCreationEnum } from "../permissions/enums";
import { groupPermissionLimitLinkPageCreation } from "../permissions/groups";
import { limitsCreationPageLink } from "../permissions/limits";
import { PermissionRoutesLimitLinkPageCreation } from "../permissions/types";

const handlePermissionsLimitLinkPageCreation = (permissions: string[]) => {
  const limitFinded = permissions.includes(
    PermissionRoutesLimitLinkPageCreationEnum.UNLIMITED_LINK_PAGE_CREATION
  )
    ? PermissionRoutesLimitLinkPageCreationEnum.UNLIMITED_LINK_PAGE_CREATION
    : permissions.find((p) =>
        groupPermissionLimitLinkPageCreation.includes(
          p as PermissionRoutesLimitLinkPageCreationEnum
        )
      );

  return !limitFinded
    ? null
    : limitsCreationPageLink[
        limitFinded as PermissionRoutesLimitLinkPageCreationEnum
      ];
};

export default handlePermissionsLimitLinkPageCreation;
