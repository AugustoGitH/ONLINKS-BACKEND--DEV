"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const findOneUserByEmailService_1 = __importDefault(require("../services/userServices/findOneUserByEmailService"));
const createUserService_1 = __importDefault(require("../services/userServices/createUserService"));
const groups_1 = require("../permissions/groups");
const createShortenerLinkService_1 = __importDefault(require("../services/shortenerLinkServices/createShortenerLinkService"));
const MONGO_URL = process.env.NODE_ENV === "development"
    ? process.env.MONGO_URL_DEV
    : process.env.MONGO_URL_PROD;
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Database connected and ready for ${process.env.NODE_ENV}.`);
    const userExist = yield (0, findOneUserByEmailService_1.default)(process.env.PRIMARY_USER_EMAIL || "");
    if (!userExist &&
        process.env.PRIMARY_USER_NAME &&
        process.env.PRIMARY_USER_EMAIL &&
        process.env.PRIMARY_USER_PASSWORD &&
        process.env.PRIMARY_USERNAME) {
        const user = yield (0, createUserService_1.default)({
            email: process.env.PRIMARY_USER_EMAIL,
            name: process.env.PRIMARY_USER_NAME,
            password: process.env.PRIMARY_USER_PASSWORD,
            permissions: groups_1.groupPermissionSuperAdmin,
            username: process.env.PRIMARY_USERNAME,
        });
        console.log("Primary user created successfully!");
        yield (0, createShortenerLinkService_1.default)({
            originalUrl: `${process.env.LINK_USERNAME_ONLINKS}/${user.username}`,
            title: `shortener-link-username-${user.username}`,
            userId: user._id,
            short: user.username,
        });
        console.log("Short user created successfully!");
    }
}))
    .catch((error) => console.log(error));
