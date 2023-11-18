"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUserSchema = exports.validateCreateUserSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const validateCreateUserSchema = (user) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(4).max(200),
        email: joi_1.default.string().required().email().min(4).max(200),
        permissions: joi_1.default.array().items(joi_1.default.string()),
        password: joi_1.default.string()
            .required()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/),
    });
    return schema.validate(user);
};
exports.validateCreateUserSchema = validateCreateUserSchema;
const validateUpdateUserSchema = (user) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(4).max(200),
        email: joi_1.default.string().email().min(4).max(200),
        permissions: joi_1.default.array().items(joi_1.default.string()),
        password: joi_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/),
    });
    return schema.validate(user);
};
exports.validateUpdateUserSchema = validateUpdateUserSchema;
