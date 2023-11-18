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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../models/User"));
const AppError_1 = require("../../helpers/errors/AppError");
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = Object.assign(Object.assign({}, user), { password: bcryptjs_1.default.hashSync(user.password, 10) });
        const userCreated = yield new User_1.default(newUser).save();
        return userCreated;
    }
    catch (error) {
        console.error(error);
        throw new AppError_1.AppError("An error occurred while creating a new user");
    }
});
exports.default = createUserService;
