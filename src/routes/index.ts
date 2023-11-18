import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import linkPageRoutes from "./linkPageRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/link-page", linkPageRoutes);

export default routes;
