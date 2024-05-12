import { NextFunction, Request, Response } from "express";
import findOneUserByIdService from "../../services/userServices/findOneUserByIdService";
import { AppError } from "../../helpers/errors/AppError";
import extractModelProperties from "../../helpers/extractModelProperties";
import { userModelResponse } from "./models";

const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findOneUserByIdService(req.user.id);

    if (!user) throw new AppError("User not found", 404);

    res
      .status(201)
      .clearCookie(process.env.TOKEN_NAME || "")
      .json(extractModelProperties(user, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export default logoutController;
