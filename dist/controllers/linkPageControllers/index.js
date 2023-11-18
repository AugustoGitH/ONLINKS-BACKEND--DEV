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
exports.getLinkPageDetailController = exports.getLinkPageAllController = void 0;
const findAllLinkPagesService_1 = __importDefault(require("../../services/linkPageServices/findAllLinkPagesService"));
const extractModelProperties_1 = __importDefault(require("../../helpers/extractModelProperties"));
const models_1 = require("./models");
const AppError_1 = require("../../helpers/errors/AppError");
const findOneLinkPageByIdService_1 = __importDefault(require("../../services/linkPageServices/findOneLinkPageByIdService"));
const getLinkPageAllController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linkPages = yield (0, findAllLinkPagesService_1.default)();
        res
            .status(200)
            .json((0, extractModelProperties_1.default)(linkPages, models_1.linkPageModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getLinkPageAllController = getLinkPageAllController;
const getLinkPageDetailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const linkPage = yield (0, findOneLinkPageByIdService_1.default)(id);
        if (!linkPage) {
            throw new AppError_1.AppError("Link Page not found", 404);
        }
        res
            .status(200)
            .json((0, extractModelProperties_1.default)(linkPage, models_1.linkPageModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getLinkPageDetailController = getLinkPageDetailController;
