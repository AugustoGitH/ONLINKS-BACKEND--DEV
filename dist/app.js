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
app.get("/", (req, res) => {
    res.json({ welcome: "Back-End Exclusivo da equipe do OnLinks" });
});
exports.default = app;
