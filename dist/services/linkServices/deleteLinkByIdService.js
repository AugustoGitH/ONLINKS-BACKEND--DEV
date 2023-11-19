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
const Link_1 = __importDefault(require("../../models/Link"));
const deleteLinkByIdService = (linkId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linkDeleted = yield Link_1.default.findOne(Object.assign({ _id: linkId }, (userId && { userId })));
        if (!linkDeleted) {
            throw new AppError_1.AppError("Link not found", 404);
        }
        yield linkDeleted.deleteOne();
        return linkDeleted;
    }
    catch (error) {
        console.error(error);
        if (error instanceof AppError_1.AppError) {
            throw new AppError_1.AppError(error.message, error.statusCode);
        }
        throw new AppError_1.AppError("An error occurred while deleting link");
    }
});
exports.default = deleteLinkByIdService;
