import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import linkPageRoutes from "./linkPageRoutes";
import linkRoutes from "./linkRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/link-page", linkPageRoutes);
routes.use("/link", linkRoutes);

export default routes;
