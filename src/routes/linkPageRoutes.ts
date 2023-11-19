import { Router } from "express";

import isAuth from "../middleware/isAuth";
import {
  createLinkPageController,
  deleteLinkPageController,
  deleteLinkPageRestrictController,
  getLinkPageAllController,
  getLinkPageAllRestrictController,
  getLinkPageDetailController,
  getLinkPageDetailRestrictController,
  updateLinkPageController,
  updateLinkPageRestrictController,
} from "../controllers/linkPageControllers";

const linkPageRoutes = Router();

linkPageRoutes.get(
  "/restrict/v1/",
  isAuth(["find-link-pages", "find-link-pages-restrict"]),
  getLinkPageAllRestrictController
);

linkPageRoutes.get(
  "/v1",
  isAuth(["find-link-pages"]),
  getLinkPageAllController
);

linkPageRoutes.get(
  "/v1/:id",
  isAuth(["find-link-page"]),
  getLinkPageDetailController
);
linkPageRoutes.get(
  "/restrict/v1/:id",
  isAuth(["find-link-page", "find-link-page-restrict"]),
  getLinkPageDetailRestrictController
);

linkPageRoutes.post(
  "/v1",
  isAuth(["create-link-page"]),
  createLinkPageController
);

linkPageRoutes.patch(
  "/v1/:id",
  isAuth(["update-link-page"]),
  updateLinkPageController
);
linkPageRoutes.patch(
  "/restrict/v1/:id",
  isAuth(["update-link-page", "update-link-restrict"]),
  updateLinkPageRestrictController
);

linkPageRoutes.delete(
  "/v1/:id",
  isAuth(["delete-link-page"]),
  deleteLinkPageController
);

linkPageRoutes.delete(
  "/restrict/v1/:id",
  isAuth(["delete-link-page", "delete-link-page-restrict"]),
  deleteLinkPageRestrictController
);

export default linkPageRoutes;
