import { Router } from "express";
import isAuth from "../middleware/isAuth";
import registerController from "../controllers/authControllers/registerController";
import loginController from "../controllers/authControllers/loginController";
import currentUserController from "../controllers/authControllers/currentUserController";
import logoutController from "../controllers/authControllers/logoutController";
import verifyUsernameController from "../controllers/authControllers/verifyUsernameController";

const authRoutes = Router();

authRoutes.post("/v1/register", registerController);
authRoutes.post("/v1/login", loginController);
authRoutes.get("/v1/current-user", isAuth(), currentUserController);
authRoutes.get("/v1/logout", isAuth(["logout"]), logoutController);
authRoutes.get("/v1/username-search/:username", verifyUsernameController);

export default authRoutes;
