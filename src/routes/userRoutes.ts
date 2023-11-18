import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserAllController,
  getUserDetailController,
  updateUserController,
} from "../controllers/userControllers";
import isAuth from "../middleware/isAuth";

const userRoutes = Router();

userRoutes.get("/v1/:id", isAuth(["find-user"]), getUserDetailController);
userRoutes.get("/v1", isAuth(["find-users"]), getUserAllController);
userRoutes.delete("/v1/:id", isAuth(["delete-user"]), deleteUserController);
userRoutes.patch("/v1/:id", isAuth(["update-user"]), updateUserController);
userRoutes.post("/v1", isAuth(["create-user"]), createUserController);
export default userRoutes;
