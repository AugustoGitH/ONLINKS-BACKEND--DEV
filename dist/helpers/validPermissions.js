"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_1 = require("../permissions/groups");
const checkRepeatedItemsInAnArray_1 = __importDefault(require("./checkRepeatedItemsInAnArray"));
const validPermissions = (permissions) => {
    const duplicatePermissions = (0, checkRepeatedItemsInAnArray_1.default)(permissions);
    if (duplicatePermissions.length > 0) {
        return {
            message: "Duplicate permission",
            permission: duplicatePermissions[0],
        };
    }
    const permissionsInvalid = permissions.filter((permission) => !groups_1.groupPermissionAll.includes(permission));
    if (permissionsInvalid.length > 0) {
        return {
            message: "Invalid permission",
            permission: permissionsInvalid[0],
        };
    }
    return null;
};
exports.default = validPermissions;
