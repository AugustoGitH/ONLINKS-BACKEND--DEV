"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const linkControllers_1 = require("../controllers/linkControllers");
const linkRoutes = (0, express_1.Router)();
linkRoutes.get("/v1/all/:userId", (0, isAuth_1.default)(["find-links"]), linkControllers_1.getLinkAllController);
linkRoutes.get("/restrict/v1/all/:linkPageId", (0, isAuth_1.default)(["find-links", "find-links-restrict"]), linkControllers_1.getLinkAllRestrictController);
linkRoutes.get("/v1/:id", (0, isAuth_1.default)(["find-link"]), linkControllers_1.getLinkDetailController);
linkRoutes.get("/restrict/v1/:id", (0, isAuth_1.default)(["find-link", "find-link-restrict"]), linkControllers_1.getLinkDetailRestrictController);
linkRoutes.post("/v1", (0, isAuth_1.default)(["create-link"]), linkControllers_1.createLinkController);
linkRoutes.patch("/v1/:id", (0, isAuth_1.default)(["update-link"]), linkControllers_1.updateLinkController);
linkRoutes.patch("/restrict/v1/:id", (0, isAuth_1.default)(["update-link", "update-link-restrict"]), linkControllers_1.updateLinkRestrictController);
linkRoutes.delete("/v1/:id", (0, isAuth_1.default)(["delete-link"]), linkControllers_1.deleteLinkController);
linkRoutes.delete("/restrict/v1/:id", (0, isAuth_1.default)(["delete-link", "delete-link-restrict"]), linkControllers_1.deleteLinkRestrictController);
exports.default = linkRoutes;
