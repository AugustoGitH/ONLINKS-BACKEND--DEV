"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authControllers_1 = require("../controllers/authControllers");
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const authRoutes = (0, express_1.Router)();
authRoutes.post("/v1/register", authControllers_1.registerController);
authRoutes.post("/v1/login", authControllers_1.loginController);
authRoutes.get("/v1/current-user", (0, isAuth_1.default)(), authControllers_1.currentUserController);
authRoutes.get("/v1/logout", (0, isAuth_1.default)(["logout"]), authControllers_1.logoutController);
authRoutes.get("/v1/username-search/:username", authControllers_1.verifyUsernameController);
exports.default = authRoutes;
