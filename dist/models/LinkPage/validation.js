"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateLinkPageSchema = exports.validateCreateLinkPageSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const validateCreateLinkPageSchema = (linkPage) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().min(4).max(200),
        subTitle: joi_1.default.string().min(4).max(500),
        description: joi_1.default.string().min(10).max(1000),
        profile: joi_1.default.string(),
        banner: joi_1.default.string(),
    });
    return schema.validate(linkPage);
};
exports.validateCreateLinkPageSchema = validateCreateLinkPageSchema;
const validateUpdateLinkPageSchema = (linkPage) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(4).max(200),
        subTitle: joi_1.default.string().min(4).max(500),
        description: joi_1.default.string().min(10).max(1000),
        profile: joi_1.default.string(),
        banner: joi_1.default.string(),
    });
    return schema.validate(linkPage);
};
exports.validateUpdateLinkPageSchema = validateUpdateLinkPageSchema;
