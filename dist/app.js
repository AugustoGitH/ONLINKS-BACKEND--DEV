"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./bootstrap");
require("./database");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const upload_1 = __importDefault(require("./config/upload"));
const routes_1 = __importDefault(require("./routes"));
const AppError_1 = require("./helpers/errors/AppError");
const app = (0, express_1.default)();
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.FRONT_END_URL,
//   })
// );
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/public", express_1.default.static(upload_1.default.directory));
app.use("/api", routes_1.default);
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
});
exports.default = app;
