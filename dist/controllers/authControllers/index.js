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
exports.logoutController = exports.verifyUsernameController = exports.registerController = exports.currentUserController = exports.loginController = void 0;
const findOneUserByEmailService_1 = __importDefault(require("../../services/userServices/findOneUserByEmailService"));
const createUserService_1 = __importDefault(require("../../services/userServices/createUserService"));
const extractModelProperties_1 = __importDefault(require("../../helpers/extractModelProperties"));
const models_1 = require("./models");
const AppError_1 = require("../../helpers/errors/AppError");
const validation_1 = require("./validation");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createJWTUserService_1 = __importDefault(require("../../services/authServices/createJWTUserService"));
const findOneUserByIdService_1 = __importDefault(require("../../services/userServices/findOneUserByIdService"));
const findOneUserByUsernameService_1 = __importDefault(require("../../services/userServices/findOneUserByUsernameService"));
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const { error } = (0, validation_1.validateLoginSchema)(user);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        const userExist = yield (0, findOneUserByEmailService_1.default)(user.email);
        if (!userExist) {
            throw new AppError_1.AppError("Incorrect email or password", 404);
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(user.password, userExist.password);
        if (!passwordIsValid) {
            throw new AppError_1.AppError("Incorrect email or password", 404);
        }
        const payloadUser = {
            email: userExist.email,
            id: userExist._id.toString(),
            name: userExist.name,
            permissions: userExist.permissions,
        };
        const token = (0, createJWTUserService_1.default)(payloadUser);
        res
            .status(201)
            .cookie(process.env.TOKEN_NAME || "", token, {
            secure: true,
            httpOnly: true,
        })
            .json({
            message: "Login successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginController = loginController;
const currentUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, findOneUserByIdService_1.default)(req.user.id);
        if (!user) {
            throw new AppError_1.AppError("User not found");
        }
        res.status(200).json((0, extractModelProperties_1.default)(user, models_1.userModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.currentUserController = currentUserController;
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const { error } = (0, validation_1.validateRegisterSchema)(user);
        if (error) {
            throw new AppError_1.AppError(error.message);
        }
        const userExist = (yield (0, findOneUserByUsernameService_1.default)(user.username)) ||
            (yield (0, findOneUserByEmailService_1.default)(user.email));
        if (userExist) {
            throw new AppError_1.AppError("User already exists");
        }
        const userCreated = yield (0, createUserService_1.default)(user);
        res
            .status(201)
            .json((0, extractModelProperties_1.default)(userCreated, models_1.userModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.registerController = registerController;
const verifyUsernameController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        if (!username) {
            throw new AppError_1.AppError("Username is required");
        }
        const usernameExist = yield (0, findOneUserByUsernameService_1.default)(username);
        res.status(200).json({ found: !!usernameExist });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyUsernameController = verifyUsernameController;
const logoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, findOneUserByIdService_1.default)(req.user.id);
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        res
            .status(201)
            .clearCookie(process.env.TOKEN_NAME || "")
            .json((0, extractModelProperties_1.default)(user, models_1.userModelResponse));
    }
    catch (error) {
        next(error);
    }
});
exports.logoutController = logoutController;
