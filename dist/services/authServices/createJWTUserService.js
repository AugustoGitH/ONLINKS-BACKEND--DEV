"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../helpers/errors/AppError");
const auth_1 = __importDefault(require("../../config/auth"));
const createJWTUserService = (payload) => {
    const { secret, expiresIn } = auth_1.default;
    try {
        const token = (0, jsonwebtoken_1.sign)(payload, secret, {
            subject: payload.id,
            expiresIn,
        });
        return token;
    }
    catch (error) {
        console.error(error);
        throw new AppError_1.AppError("An error occurred when creating jwt for user");
    }
};
exports.default = createJWTUserService;
