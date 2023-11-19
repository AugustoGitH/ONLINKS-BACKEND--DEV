"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groups_1 = require("../permissions/groups");
const limits_1 = require("../permissions/limits");
const handlePermissionsLimitLinkPageCreation = (permissions) => {
    const limitFinded = permissions.find((p) => groups_1.groupPermissionLimitLinkPageCreation.includes(p));
    return !limitFinded
        ? null
        : limits_1.limitsCreationPageLink[limitFinded];
};
exports.default = handlePermissionsLimitLinkPageCreation;
