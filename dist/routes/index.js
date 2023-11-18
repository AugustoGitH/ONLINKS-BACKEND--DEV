"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const linkPageRoutes_1 = __importDefault(require("./linkPageRoutes"));
const routes = (0, express_1.Router)();
routes.use("/auth", authRoutes_1.default);
routes.use("/user", userRoutes_1.default);
routes.use("/link-page", linkPageRoutes_1.default);
exports.default = routes;
