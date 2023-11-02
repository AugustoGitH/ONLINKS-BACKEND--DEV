"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = process.env.NODE_ENV === "development"
    ? process.env.MONGO_URL_DEV
    : process.env.MONGO_URL_PROD;
console.log(MONGO_URL);
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    console.log(`Database connected and ready for ${process.env.NODE_ENV}.`);
})
    .catch((error) => console.log(error));
