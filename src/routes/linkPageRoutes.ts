import { Router } from "express";

import isAuth from "../middleware/isAuth";
import {
  getLinkPageAllController,
  getLinkPageDetailController,
} from "../controllers/linkPageControllers";

const linkPageRoutes = Router();

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

export default linkPageRoutes;
