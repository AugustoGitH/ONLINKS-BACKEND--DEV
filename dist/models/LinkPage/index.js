"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("./enums");
const linkPageSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true },
    subTitle: { type: String, default: null },
    description: { type: String, default: null },
    profile: { type: String, default: null },
    banner: { type: String, default: null },
    theme: { type: String, default: enums_1.ThemePage.DEFAULT },
    isDefault: { type: Boolean, default: false },
    userId: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("LinkPage", linkPageSchema);
