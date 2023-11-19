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
exports.deleteLinkRestrictController = exports.deleteLinkController = exports.getLinkAllRestrictController = exports.getLinkAllController = exports.updateLinkController = exports.updateLinkRestrictController = exports.getLinkDetailRestrictController = exports.getLinkDetailController = exports.createLinkController = void 0;
const validation_1 = require("../../models/Link/validation");
const AppError_1 = require("../../helpers/errors/AppError");
const findOneLinkPageByIdService_1 = __importDefault(require("../../services/linkPageServices/findOneLinkPageByIdService"));
const findAllLinkService_1 = __importDefault(require("../../services/linkServices/findAllLinkService"));
const handlePermissionsLimitLinkCreation_1 = __importDefault(require("../../helpers/handlePermissionsLimitLinkCreation"));
const createLinkService_1 = __importDefault(require("../../services/linkServices/createLinkService"));
const extractModelProperties_1 = __importDefault(require("../../helpers/extractModelProperties"));
const models_1 = require("./models");
const findOneLinkByTitleService_1 = __importDefault(require("../../services/linkServices/findOneLinkByTitleService"));
const findOneLinkByHrefService_1 = __importDefault(require("../../services/linkServices/findOneLinkByHrefService"));
const findOneLinkByIdService_1 = __importDefault(require("../../services/linkServices/findOneLinkByIdService"));
const updateLinkService_1 = __importDefault(require("../../services/linkServices/updateLinkService"));
const deleteLinkByIdService_1 = __importDefault(require("../../services/linkServices/deleteLinkByIdService"));
const createLinkController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body;
    try {
        const { error } = (0, validation_1.validateCreateLinkSchema)(link);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        const linkPageExist = yield (0, findOneLinkPageByIdService_1.default)(link.linkPageId, req.user.id);
        if (!linkPageExist) {
            throw new AppError_1.AppError("Link page does not exist", 404);
        }
        const linkExists = yield (0, findAllLinkService_1.default)({
            linkPageId: linkPageExist._id,
        });
        const limitLinkCreation = (0, handlePermissionsLimitLinkCreation_1.default)(req.user.permissions);
        if (!limitLinkCreation) {
            throw new AppError_1.AppError("No creation limit was found for your profile", 404);
        }
        if (limitLinkCreation !== -666 && linkExists.length >= limitLinkCreation) {
            throw new AppError_1.AppError("Limit of broken links");
        }
        const linkTitleExist = yield (0, findOneLinkByTitleService_1.default)({
            title: link.title,
            linkPageId: linkPageExist._id,
        });
        if (linkTitleExist) {
            throw new AppError_1.AppError("A link with the same title already exists");
        }
        const linkHrefExist = yield (0, findOneLinkByHrefService_1.default)({
            href: link.href,
            linkPageId: linkPageExist._id,
        });
        if (linkHrefExist) {
            throw new AppError_1.AppError("A link with the same url already exists");
        }
        const linkCreated = yield (0, createLinkService_1.default)(Object.assign(Object.assign({}, link), { userId: req.user.id }));
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(linkCreated, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.createLinkController = createLinkController;
const getLinkDetailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const link = yield (0, findOneLinkByIdService_1.default)({
            id,
        });
        if (!link) {
            throw new AppError_1.AppError("Link not found", 404);
        }
        res.status(200).json((0, extractModelProperties_1.default)(link, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getLinkDetailController = getLinkDetailController;
const getLinkDetailRestrictController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const link = yield (0, findOneLinkByIdService_1.default)({
            id,
            userId: req.user.id,
        });
        if (!link) {
            throw new AppError_1.AppError("Link not found", 404);
        }
        res.status(200).json((0, extractModelProperties_1.default)(link, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getLinkDetailRestrictController = getLinkDetailRestrictController;
const updateLinkRestrictController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const linkFields = req.body;
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const { error } = (0, validation_1.validateUpdateLinkSchema)(linkFields);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        const linkExist = yield (0, findOneLinkByIdService_1.default)({
            id,
            userId: req.user.id,
        });
        if (!linkExist) {
            throw new AppError_1.AppError("Link not found", 404);
        }
        if (linkFields.title) {
            const linkTitleExist = yield (0, findOneLinkByTitleService_1.default)({
                title: linkFields.title,
                linkPageId: linkExist._id,
                userId: req.user.id,
            });
            if (linkTitleExist) {
                throw new AppError_1.AppError("A link with the same title already exists");
            }
        }
        if (linkFields.href) {
            const linkHrefExist = yield (0, findOneLinkByHrefService_1.default)({
                href: linkFields.href,
                linkPageId: linkExist._id,
                userId: req.user.id,
            });
            if (linkHrefExist) {
                throw new AppError_1.AppError("A link with the same href already exists");
            }
        }
        const linkUpdated = yield (0, updateLinkService_1.default)(linkFields, linkExist._id, req.user.id);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(linkUpdated, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.updateLinkRestrictController = updateLinkRestrictController;
const updateLinkController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const linkFields = req.body;
    const { id } = req.params;
    try {
        if (!id)
            throw new AppError_1.AppError("Id is required");
        const { error } = (0, validation_1.validateUpdateLinkSchema)(linkFields);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        const linkExist = yield (0, findOneLinkByIdService_1.default)({
            id,
        });
        if (!linkExist) {
            throw new AppError_1.AppError("Link not found", 404);
        }
        if (linkFields.title) {
            const linkTitleExist = yield (0, findOneLinkByTitleService_1.default)({
                title: linkFields.title,
                linkPageId: linkExist._id,
            });
            if (linkTitleExist) {
                throw new AppError_1.AppError("A link with the same title already exists");
            }
        }
        if (linkFields.href) {
            const linkHrefExist = yield (0, findOneLinkByHrefService_1.default)({
                href: linkFields.href,
                linkPageId: linkExist._id,
            });
            if (linkHrefExist) {
                throw new AppError_1.AppError("A link with the same href already exists");
            }
        }
        const linkUpdated = yield (0, updateLinkService_1.default)(linkFields, linkExist._id);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(linkUpdated, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.updateLinkController = updateLinkController;
const getLinkAllController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (!userId) {
            throw new AppError_1.AppError("User id is required");
        }
        const links = yield (0, findAllLinkService_1.default)({
            userId,
        });
        res.status(200).json((0, extractModelProperties_1.default)(links, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getLinkAllController = getLinkAllController;
const getLinkAllRestrictController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { linkPageId } = req.params;
    try {
        if (!linkPageId) {
            throw new AppError_1.AppError("Link Page id is required");
        }
        const links = yield (0, findAllLinkService_1.default)({
            linkPageId,
            userId: req.user.id,
        });
        res.status(200).json((0, extractModelProperties_1.default)(links, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.getLinkAllRestrictController = getLinkAllRestrictController;
const deleteLinkController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            throw new AppError_1.AppError("Id is required");
        }
        const linkDeleted = yield (0, deleteLinkByIdService_1.default)(id);
        res
            .status(200)
            .json((0, extractModelProperties_1.default)(linkDeleted, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.deleteLinkController = deleteLinkController;
const deleteLinkRestrictController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            throw new AppError_1.AppError("Id is required");
        }
        const linkDeleted = yield (0, deleteLinkByIdService_1.default)(id, req.user.id);
        res
            .status(200)
            .json((0, extractModelProperties_1.default)(linkDeleted, models_1.linkModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.deleteLinkRestrictController = deleteLinkRestrictController;
