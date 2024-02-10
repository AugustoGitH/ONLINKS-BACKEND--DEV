import { Router } from "express";
import { getPageDetailController } from "../controllers/pageControllers";

const pageRoutes = Router();

pageRoutes.get("/v1/:username", getPageDetailController);

export default pageRoutes;
