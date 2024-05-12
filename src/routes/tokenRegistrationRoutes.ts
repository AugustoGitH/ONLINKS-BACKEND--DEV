import { Router } from "express";

import isAuth from "../middleware/isAuth";
import getTokenRegistrationDetailController from "../controllers/tokenRegistrationControllers/getTokenRegistrationDetailController";
import getTokenRegistrationAllController from "../controllers/tokenRegistrationControllers/getTokenRegistrationAllController";
import getTokenRegistrationDetailRestrictController from "../controllers/tokenRegistrationControllers/getTokenRegistrationDetailRestrictController";
import getTokenRegistrationAllRestrictController from "../controllers/tokenRegistrationControllers/getTokenRegistrationAllRestrictController";
import createTokenRegistrationController from "../controllers/tokenRegistrationControllers/createTokenRegistrationController";
import updateTokenRegistrationController from "../controllers/tokenRegistrationControllers/updateTokenRegistrationController";
import updateTokenRegistrationRestrictController from "../controllers/tokenRegistrationControllers/updateTokenRegistrationRestrictController";
import deleteTokenRegistrationController from "../controllers/tokenRegistrationControllers/deleteTokenRegistrationController";
import deleteTokenRegistrationRestrictController from "../controllers/tokenRegistrationControllers/deleteTokenRegistrationRestrictController";

const tokenRegistrationRoutes = Router();

tokenRegistrationRoutes.get(
  "/v1/:id",
  isAuth(["find-token-registration"]),
  getTokenRegistrationDetailController
);
tokenRegistrationRoutes.get(
  "/v1/all/:userId",
  isAuth(["find-token-registrations"]),
  getTokenRegistrationAllController
);

tokenRegistrationRoutes.get(
  "/restrict/v1/:id",
  isAuth(["find-token-registration", "find-token-registration-restrict"]),
  getTokenRegistrationDetailRestrictController
);
tokenRegistrationRoutes.get(
  "/restrict/all/v1",
  isAuth(["find-token-registrations", "find-token-registrations-restrict"]),
  getTokenRegistrationAllRestrictController
);

tokenRegistrationRoutes.post(
  "/v1",
  isAuth(["create-token-registration"]),
  createTokenRegistrationController
);
tokenRegistrationRoutes.patch(
  "/v1",
  isAuth(["update-token-registration"]),
  updateTokenRegistrationController
);
tokenRegistrationRoutes.patch(
  "/restrict/v1",
  isAuth(["update-token-registration-restrict"]),
  updateTokenRegistrationRestrictController
);

tokenRegistrationRoutes.delete(
  "/v1/:id",
  isAuth(["delete-token-registration"]),
  deleteTokenRegistrationController
);
tokenRegistrationRoutes.delete(
  "/restrict/v1/:id",
  isAuth(["delete-token-registration-restrict"]),
  deleteTokenRegistrationRestrictController
);

export default tokenRegistrationRoutes;
