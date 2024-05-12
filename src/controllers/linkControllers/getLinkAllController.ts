import { NextFunction, Request, Response } from "express";
import { AppError } from "../../helpers/errors/AppError";
import findAllLinkService from "../../services/linkServices/findAllLinkService";
import extractModelProperties from "../../helpers/extractModelProperties";
import { linkModelResponse } from "./models";

const getLinkAllController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) throw new AppError("User id is required");

    const links = await findAllLinkService({
      userId,
    });

    res.status(200).json(extractModelProperties(links, linkModelResponse));
  } catch (error) {
    next(error);
  }
};

export default getLinkAllController;
