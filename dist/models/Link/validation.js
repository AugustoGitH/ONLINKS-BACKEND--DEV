"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateLinkSchema = exports.validateCreateLinkSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const urlRegex_1 = require("../../regex/urlRegex");
const validateCreateLinkSchema = (link) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().min(4).max(100),
        order: joi_1.default.number().required(),
        href: joi_1.default.string().required().regex(urlRegex_1.urlRegex).message("Invalid url!"),
        icon: joi_1.default.string().allow(null),
        linkPageId: joi_1.default.string().required(),
    });
    return schema.validate(link);
};
exports.validateCreateLinkSchema = validateCreateLinkSchema;
const validateUpdateLinkSchema = (link) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(4).max(100),
        order: joi_1.default.number(),
        href: joi_1.default.string().regex(urlRegex_1.urlRegex).message("Invalid url!"),
        icon: joi_1.default.string().allow(null),
    });
    return schema.validate(link);
};
exports.validateUpdateLinkSchema = validateUpdateLinkSchema;
