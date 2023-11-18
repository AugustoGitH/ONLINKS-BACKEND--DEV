"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    href: { type: String, required: true },
    icon: { type: String, required: true },
    linkPageId: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Link", linkSchema);
