import { groupPermissionAll } from "../permissions/groups";
import { Permission } from "../permissions/types";
import checkRepeatedItemsInAnArray from "./checkRepeatedItemsInAnArray";

interface ValidPermissionsMessage {
  message: string;
  permission: string;
}

const validPermissions = (
  permissions: string[]
): ValidPermissionsMessage | null => {
  const duplicatePermissions = checkRepeatedItemsInAnArray(permissions);
  if (duplicatePermissions.length > 0) {
    return {
      message: "Duplicate permission",
      permission: duplicatePermissions[0],
    };
  }

  const permissionsInvalid = permissions.filter(
    (permission) => !groupPermissionAll.includes(permission as Permission)
  );

  if (permissionsInvalid.length > 0) {
    return {
      message: "Invalid permission",
      permission: permissionsInvalid[0],
    };
  }

  return null;
};

export default validPermissions;
