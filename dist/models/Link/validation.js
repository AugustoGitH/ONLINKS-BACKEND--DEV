"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateLinkSchema = exports.validateCreateLinkSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const validateCreateLinkSchema = (link) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().min(4).max(100),
        href: joi_1.default.string()
            .required()
            .regex(/^(https?:\/\/)?([\w\d]+\.)?[\w\d-]+(\.[\w\d]{2,})+([\w\d-._~:/?#[\]@!$&'()*+,;=]+)?$/i),
        icon: joi_1.default.string().required(),
        linkPageId: joi_1.default.string().required(),
    });
    return schema.validate(link);
};
exports.validateCreateLinkSchema = validateCreateLinkSchema;
const validateUpdateLinkSchema = (link) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(4).max(100),
        href: joi_1.default.string().regex(/^(https?:\/\/)?([\w\d]+\.)?[\w\d-]+(\.[\w\d]{2,})+([\w\d-._~:/?#[\]@!$&'()*+,;=]+)?$/i),
        icon: joi_1.default.string(),
    });
    return schema.validate(link);
};
exports.validateUpdateLinkSchema = validateUpdateLinkSchema;
