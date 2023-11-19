import { groupPermissionLimitLinkCreation } from "../permissions/groups";
import { limitsCreationLink } from "../permissions/limits";
import { PermissionRoutesLimitLinkCreation } from "../permissions/types";

const handlePermissionsLimitLinkCreation = (permissions: string[]) => {
  const limitFinded = permissions.find((p) =>
    groupPermissionLimitLinkCreation.includes(
      p as PermissionRoutesLimitLinkCreation
    )
  );

  return !limitFinded
    ? null
    : limitsCreationLink[limitFinded as PermissionRoutesLimitLinkCreation];
};

export default handlePermissionsLimitLinkCreation;
