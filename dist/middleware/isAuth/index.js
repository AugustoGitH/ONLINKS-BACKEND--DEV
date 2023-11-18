"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../helpers/errors/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../../config/auth"));
const isAuth = (permissionsAuth) => (req, res, next) => {
    const token = req.cookies["onlinks-sytem-token"];
    if (!token) {
        throw new AppError_1.AppError("Unauthorized credentials", 403);
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
        const { id, permissions } = decoded;
        const isValidPermissions = permissionsAuth
            ? permissions.some((p) => permissionsAuth.includes(p))
            : true;
        if (!isValidPermissions) {
            throw new AppError_1.AppError("Unauthorized credentials", 403);
        }
        req.user = { id, permissions };
        next();
    }
    catch (error) {
        console.error(error);
        throw new AppError_1.AppError("Unauthorized credentials", 403);
    }
};
exports.default = isAuth;
