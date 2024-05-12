"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const registerController_1 = __importDefault(require("../controllers/authControllers/registerController"));
const loginController_1 = __importDefault(require("../controllers/authControllers/loginController"));
const currentUserController_1 = __importDefault(require("../controllers/authControllers/currentUserController"));
const logoutController_1 = __importDefault(require("../controllers/authControllers/logoutController"));
const verifyUsernameController_1 = __importDefault(require("../controllers/authControllers/verifyUsernameController"));
const authRoutes = (0, express_1.Router)();
authRoutes.post("/v1/register", registerController_1.default);
authRoutes.post("/v1/login", loginController_1.default);
authRoutes.get("/v1/current-user", (0, isAuth_1.default)(), currentUserController_1.default);
authRoutes.get("/v1/logout", (0, isAuth_1.default)(["logout"]), logoutController_1.default);
authRoutes.get("/v1/username-search/:username", verifyUsernameController_1.default);
exports.default = authRoutes;
