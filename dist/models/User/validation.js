"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUserSchema = exports.validateCreateUserSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const validPermissions_1 = __importDefault(require("../../helpers/validPermissions"));
const validateCreateUserSchema = (user) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(4).max(200),
        username: joi_1.default.string().required().min(4).max(100),
        email: joi_1.default.string().required().email().min(4).max(200),
        permissions: joi_1.default.array()
            .items(joi_1.default.string())
            .custom((permissions, helpers) => {
            if (permissions) {
                const verifyPermissions = (0, validPermissions_1.default)(permissions);
                if (verifyPermissions) {
                    return helpers.message(`${verifyPermissions.message}: '${verifyPermissions.permission}'`);
                }
            }
            return permissions;
        }),
        password: joi_1.default.string()
            .required()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
            .message("The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 6 characters long."),
    });
    return schema.validate(user);
};
exports.validateCreateUserSchema = validateCreateUserSchema;
const validateUpdateUserSchema = (user) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(4).max(200),
        username: joi_1.default.string().min(4).max(100),
        email: joi_1.default.string().email().min(4).max(200),
        permissions: joi_1.default.array()
            .items(joi_1.default.string())
            .custom((permissions, helpers) => {
            if (permissions) {
                const verifyPermissions = (0, validPermissions_1.default)(permissions);
                if (verifyPermissions) {
                    return helpers.message(`${verifyPermissions.message}: '${verifyPermissions.permission}'`);
                }
            }
            return permissions;
        }),
        password: joi_1.default.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
            .message("The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 6 characters long."),
    });
    return schema.validate(user);
};
exports.validateUpdateUserSchema = validateUpdateUserSchema;
