"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/v1/:id", (0, isAuth_1.default)(["find-user"]), userControllers_1.getUserDetailController);
userRoutes.get("/v1", (0, isAuth_1.default)(["find-users"]), userControllers_1.getUserAllController);
userRoutes.delete("/v1/:id", (0, isAuth_1.default)(["delete-user"]), userControllers_1.deleteUserController);
userRoutes.patch("/v1/:id", (0, isAuth_1.default)(["update-user"]), userControllers_1.updateUserController);
userRoutes.post("/v1", (0, isAuth_1.default)(["create-user"]), userControllers_1.createUserController);
exports.default = userRoutes;
