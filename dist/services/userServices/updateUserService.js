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
const AppError_1 = require("../../helpers/errors/AppError");
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updateUserService = (userFields, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUpdated = yield User_1.default.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, userFields), (userFields.password && {
            password: bcryptjs_1.default.hashSync(userFields.password, 10),
        })), {
            new: true,
        });
        if (!userUpdated) {
            throw new AppError_1.AppError("User not found");
        }
        return userUpdated;
    }
    catch (error) {
        console.error(error);
        if (error instanceof AppError_1.AppError) {
            throw new AppError_1.AppError(error.message, error.statusCode);
        }
        throw new AppError_1.AppError("An error occurred while updating a user");
    }
});
exports.default = updateUserService;
