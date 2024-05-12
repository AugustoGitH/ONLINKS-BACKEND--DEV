import { Router } from "express";

import isAuth from "../middleware/isAuth";
import getLinkAllController from "../controllers/linkControllers/getLinkAllController";
import getLinkAllRestrictController from "../controllers/linkControllers/getLinkAllRestrictController";
import getLinkDetailController from "../controllers/linkControllers/getLinkDetailController";
import getLinkDetailRestrictController from "../controllers/linkControllers/getLinkDetailRestrictController";
import createLinkController from "../controllers/linkControllers/createLinkController";
import updateLinkController from "../controllers/linkControllers/updateLinkController";
import updateLinkRestrictController from "../controllers/linkControllers/updateLinkRestrictController";
import deleteLinkController from "../controllers/linkControllers/deleteLinkController";
import deleteLinkRestrictController from "../controllers/linkControllers/deleteLinkRestrictController";

const linkRoutes = Router();

linkRoutes.get("/v1/all/:userId", isAuth(["find-links"]), getLinkAllController);
linkRoutes.get(
  "/restrict/v1/all/:linkPageId",
  isAuth(["find-links", "find-links-restrict"]),
  getLinkAllRestrictController
);

linkRoutes.get("/v1/:id", isAuth(["find-link"]), getLinkDetailController);
linkRoutes.get(
  "/restrict/v1/:id",
  isAuth(["find-link", "find-link-restrict"]),
  getLinkDetailRestrictController
);

linkRoutes.post("/v1", isAuth(["create-link"]), createLinkController);

linkRoutes.patch("/v1/:id", isAuth(["update-link"]), updateLinkController);
linkRoutes.patch(
  "/restrict/v1/:id",
  isAuth(["update-link", "update-link-restrict"]),
  updateLinkRestrictController
);

linkRoutes.delete("/v1/:id", isAuth(["delete-link"]), deleteLinkController);
linkRoutes.delete(
  "/restrict/v1/:id",
  isAuth(["delete-link", "delete-link-restrict"]),
  deleteLinkRestrictController
);
export default linkRoutes;
