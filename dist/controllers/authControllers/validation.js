"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterSchema = exports.validateLoginSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const validateLoginSchema = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().email().min(4).max(200),
        password: joi_1.default.string()
            .required()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
            .message("The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 6 characters long."),
    });
    return schema.validate(user);
};
exports.validateLoginSchema = validateLoginSchema;
const validateRegisterSchema = (user) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required().min(4).max(100),
        name: joi_1.default.string().required().min(4).max(200),
        email: joi_1.default.string().required().email().min(4).max(200),
        password: joi_1.default.string()
            .required()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
            .message("The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be at least 6 characters long."),
    });
    return schema.validate(user);
};
exports.validateRegisterSchema = validateRegisterSchema;
