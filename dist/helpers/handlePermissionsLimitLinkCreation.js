"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../permissions/enums");
const groups_1 = require("../permissions/groups");
const limits_1 = require("../permissions/limits");
const handlePermissionsLimitLinkCreation = (permissions) => {
    const limitFinded = permissions.includes(enums_1.PermissionRoutesLimitLinkCreationEnum.UNLIMITED_LINK_CREATION)
        ? enums_1.PermissionRoutesLimitLinkCreationEnum.UNLIMITED_LINK_CREATION
        : permissions.find((p) => groups_1.groupPermissionLimitLinkCreation.includes(p));
    return !limitFinded
        ? null
        : limits_1.limitsCreationLink[limitFinded];
};
exports.default = handlePermissionsLimitLinkCreation;
