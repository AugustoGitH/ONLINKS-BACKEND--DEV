"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true },
    href: { type: String, required: true },
    icon: { type: String, default: null, required: false },
    short: { type: String, default: null, required: false },
    linkPageId: { type: String, required: true },
    userId: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Link", linkSchema);
