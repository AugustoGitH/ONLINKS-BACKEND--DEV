import { NextFunction, Request, Response } from "express";
import findOneUserByIdService from "../../services/userServices/findOneUserByIdService";
import { AppError } from "../../helpers/errors/AppError";
import extractModelProperties from "../../helpers/extractModelProperties";
import { userModelResponse } from "./models";

const currentUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findOneUserByIdService(req.user.id);

    if (!user) throw new AppError("User not found");

    res.status(200).json(extractModelProperties(user, userModelResponse));
  } catch (error) {
    next(error);
  }
};

export default currentUserController;
