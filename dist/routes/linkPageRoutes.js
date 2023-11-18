"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const linkPageControllers_1 = require("../controllers/linkPageControllers");
const linkPageRoutes = (0, express_1.Router)();
linkPageRoutes.get("/v1", (0, isAuth_1.default)(["find-link-pages"]), linkPageControllers_1.getLinkPageAllController);
linkPageRoutes.get("/v1/:id", (0, isAuth_1.default)(["find-link-page"]), linkPageControllers_1.getLinkPageDetailController);
exports.default = linkPageRoutes;
