import { groupPermissionLimitLinkPageCreation } from "../permissions/groups";
import { limitsCreationPageLink } from "../permissions/limits";
import { PermissionRoutesLimitLinkPageCreation } from "../permissions/types";

const handlePermissionsLimitLinkPageCreation = (permissions: string[]) => {
  const limitFinded = permissions.find((p) =>
    groupPermissionLimitLinkPageCreation.includes(
      p as PermissionRoutesLimitLinkPageCreation
    )
  );

  return !limitFinded
    ? null
    : limitsCreationPageLink[
        limitFinded as PermissionRoutesLimitLinkPageCreation
      ];
};

export default handlePermissionsLimitLinkPageCreation;
