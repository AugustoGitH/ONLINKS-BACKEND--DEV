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
exports.createLinkPageController = exports.updateLinkPageRestrictController = exports.updateLinkPageController = exports.deleteLinkPageRestrictController = exports.deleteLinkPageController = exports.getLinkPageDetailRestrictController = exports.getLinkPageDetailController = exports.getLinkPageAllRestrictController = exports.getLinkPageAllController = void 0;
const findAllLinkPagesService_1 = __importDefault(require("../../services/linkPageServices/findAllLinkPagesService"));
const extractModelProperties_1 = __importDefault(require("../../helpers/extractModelProperties"));
const models_1 = require("./models");
const AppError_1 = require("../../helpers/errors/AppError");
const findOneLinkPageByIdService_1 = __importDefault(require("../../services/linkPageServices/findOneLinkPageByIdService"));
const validation_1 = require("../../models/LinkPage/validation");
const createLinkPageService_1 = __importDefault(require("../../services/linkPageServices/createLinkPageService"));
const updateLinkPageService_1 = __importDefault(require("../../services/linkPageServices/updateLinkPageService"));
const findOneLinkPageDefaultService_1 = __importDefault(require("../../services/linkPageServices/findOneLinkPageDefaultService"));
const deleteLinkPageByIdService_1 = __importDefault(require("../../services/linkPageServices/deleteLinkPageByIdService"));
const handlePermissionsLimitLinkPageCreation_1 = __importDefault(require("../../helpers/handlePermissionsLimitLinkPageCreation"));
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
const getLinkPageAllRestrictController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linkPages = yield (0, findAllLinkPagesService_1.default)(req.user.id);
        res
            .status(200)
            .json((0, extractModelProperties_1.default)(linkPages, models_1.linkPageModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getLinkPageAllRestrictController = getLinkPageAllRestrictController;
const getLinkPageDetailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
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
const getLinkPageDetailRestrictController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const linkPage = yield (0, findOneLinkPageByIdService_1.default)(id, req.user.id);
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
exports.getLinkPageDetailRestrictController = getLinkPageDetailRestrictController;
const deleteLinkPageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const linkPageDeleted = yield (0, deleteLinkPageByIdService_1.default)(id);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(linkPageDeleted, models_1.linkPageModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.deleteLinkPageController = deleteLinkPageController;
const deleteLinkPageRestrictController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const linkPageDeleted = yield (0, deleteLinkPageByIdService_1.default)(id, req.user.id);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(linkPageDeleted, models_1.linkPageModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.deleteLinkPageRestrictController = deleteLinkPageRestrictController;
const updateLinkPageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const linkPageFields = req.body;
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const { error } = (0, validation_1.validateUpdateLinkPageSchema)(linkPageFields);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        if (linkPageFields.isDefault) {
            const linkPageDefault = yield (0, findOneLinkPageDefaultService_1.default)(req.user.id);
            if (linkPageDefault) {
                yield (0, updateLinkPageService_1.default)({ isDefault: false }, linkPageDefault._id);
            }
        }
        const linkPageUpdated = yield (0, updateLinkPageService_1.default)(linkPageFields, id);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(linkPageUpdated, models_1.linkPageModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.updateLinkPageController = updateLinkPageController;
const updateLinkPageRestrictController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const linkPageFields = req.body;
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const { error } = (0, validation_1.validateUpdateLinkPageSchema)(linkPageFields);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        if (linkPageFields.isDefault) {
            const linkPageDefault = yield (0, findOneLinkPageDefaultService_1.default)(req.user.id);
            if (linkPageDefault) {
                yield (0, updateLinkPageService_1.default)({ isDefault: false }, linkPageDefault._id, req.user.id);
            }
        }
        const linkPageUpdated = yield (0, updateLinkPageService_1.default)(linkPageFields, id, req.user.id);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(linkPageUpdated, models_1.linkPageModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.updateLinkPageRestrictController = updateLinkPageRestrictController;
const createLinkPageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const linkPage = req.body;
    try {
        const { error } = (0, validation_1.validateCreateLinkPageSchema)(linkPage);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        const linkPageExists = yield (0, findAllLinkPagesService_1.default)(req.user.id);
        const limitLinkPageCreation = (0, handlePermissionsLimitLinkPageCreation_1.default)(req.user.permissions);
        if (!limitLinkPageCreation) {
            throw new AppError_1.AppError("No creation limit was found for your profile", 404);
        }
        if (limitLinkPageCreation !== -666 &&
            linkPageExists.length >= limitLinkPageCreation) {
            throw new AppError_1.AppError("Limit of broken link pages");
        }
        const linkPageCreated = yield (0, createLinkPageService_1.default)(Object.assign(Object.assign({}, linkPage), { userId: req.user.id }));
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(linkPageCreated, models_1.linkPageModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.createLinkPageController = createLinkPageController;
