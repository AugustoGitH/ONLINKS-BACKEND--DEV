"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const linkPageControllers_1 = require("../controllers/linkPageControllers");
const linkPageRoutes = (0, express_1.Router)();
linkPageRoutes.get("/restrict/v1/", (0, isAuth_1.default)(["find-link-pages", "find-link-pages-restrict"]), linkPageControllers_1.getLinkPageAllRestrictController);
linkPageRoutes.get("/v1", (0, isAuth_1.default)(["find-link-pages"]), linkPageControllers_1.getLinkPageAllController);
linkPageRoutes.get("/v1/:id", (0, isAuth_1.default)(["find-link-page"]), linkPageControllers_1.getLinkPageDetailController);
linkPageRoutes.get("/restrict/v1/:id", (0, isAuth_1.default)(["find-link-page", "find-link-page-restrict"]), linkPageControllers_1.getLinkPageDetailRestrictController);
linkPageRoutes.post("/v1", (0, isAuth_1.default)(["create-link-page"]), linkPageControllers_1.createLinkPageController);
linkPageRoutes.patch("/v1/:id", (0, isAuth_1.default)(["update-link-page"]), linkPageControllers_1.updateLinkPageController);
linkPageRoutes.patch("/restrict/v1/:id", (0, isAuth_1.default)(["update-link-page", "update-link-restrict"]), linkPageControllers_1.updateLinkPageRestrictController);
linkPageRoutes.delete("/v1/:id", (0, isAuth_1.default)(["delete-link-page"]), linkPageControllers_1.deleteLinkPageController);
linkPageRoutes.delete("/restrict/v1/:id", (0, isAuth_1.default)(["delete-link-page", "delete-link-page-restrict"]), linkPageControllers_1.deleteLinkPageRestrictController);
exports.default = linkPageRoutes;
